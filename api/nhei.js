import { MongoClient } from "mongodb";
import Redis from "ioredis";
import { API } from "nhentai";
import "dotenv/config";
/**
 * Creating new database instance
 */
// const redis = new Redis("redis://:nhei@redis:6379");
const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS,
});
const url = process.env.MONGO_CONNECTION;
// const url = "mongodb://nhei:nhei@mongo:27017";

let client = new MongoClient(url);

export const connect = async () => {
    try {
        await client.connect();
        return client.db("nheidev");
    } catch (error) {
        console.log("error while connecting");
    }
};

export const close = async () => {
    try {
        await client.close();
    } catch (error) {
        console.log("error while closing");
    }
};

export const getBoards = async (req, res, next) => {
    try {
        let nhei = await connect();
        let cursor = nhei.collection("boards").find();
        let boards = await cursor.toArray();
        console.log("requested for boards");
        res.send(boards);
        close();
    } catch (error) {
        console.log(`${error} error in getBoards`);
    }
};

export const getDoujin = async (req, res, next) => {
    let { id } = req.body;
    let nhei = await connect();
    let doujin = await nhei.collection("doujins").findOne({ id: id });
    console.log(doujin);
    console.log(`caching doujin ${id} `);
    redis.set(id, JSON.stringify(doujin));
    console.log(`caching ${id} completed`);
    res.send(doujin);
};

export const getFromDoujinCache = async (req, res, next) => {
    let { id } = req.body;
    redis.get(id, (err, data) => {
        if (err) throw err;
        if (data !== null) {
            console.log(`fetching doujin ${id} from doujinCache`);
            res.send(data);
            console.log(`fetch ${id} completed`);
        } else {
            next();
        }
    });
};

export const isBoardPresent = async (nhei, board) => {
    let found = await nhei.collection("boards").findOne({ board: board });
    if (found !== null) {
        return true;
    } else {
        return false;
    }
};
export const isSectionPresent = async (nhei, board, section) => {
    let found = await nhei
        .collection("boards")
        .findOne({ board: board, "sections.section": section });
    console.log(found);
    if (found !== null) {
        return true;
    } else {
        return false;
    }
};
/**
 * Creating boards
 */
export const create = async (req, res, next) => {
    try {
        let nhei = await connect();
        let { board, section } = req.body;
        let status;
        board = board.trim();
        section = section.trim();
        let created = new Date().toUTCString();
        console.log(board, section);

        if (board.length === 0) {
            res.send("board empty");
            return;
        }

        let boardStatus = await isBoardPresent(nhei, board);

        if (boardStatus) {
            status = "Board present";
        } else {
            await nhei.collection("boards").insertOne({
                board: board,
                cover: "",
                created,
                sections: [],
                pins: [],
                total: 0,
            });
            status = "Board created";
        }

        if (section.length !== 0) {
            let sectionStatus = await isSectionPresent(nhei, board, section);
            if (sectionStatus) {
                status = "section present";
            } else {
                section = { section, cover: "", created, pins: [], total: 0 };
                await nhei
                    .collection("boards")
                    .updateOne(
                        { board: board },
                        { $push: { sections: section } }
                    );
                status = "section added";
            }
        }
        res.send({ status });
    } catch (error) {
        console.log(`${error} error in create`);
    } finally {
        client.close();
    }
};

/**
 * Editing boards
 */
export const edit = async (req, res, next) => {
    try {
        let nhei = await connect();
        let { type, previous, name, parent, cover, position } = req.body;
        let status;
        console.log("cover", cover);
        name = name.trim();
        previous = previous.trim();
        if (parent) {
            parent = parent.trim();
        }
        if (type === "section") {
            let inserted = await nhei.collection("boards").updateOne(
                { board: parent, "sections.section": previous },
                {
                    $set: {
                        "sections.$.section": name,
                        "sections.$.cover": cover,
                        "sections.$.position": position,
                    },
                }
            );
            console.log(inserted);
            status = "section rename successful";
        } else {
            await nhei
                .collection("boards")
                .updateOne(
                    { board: previous },
                    { $set: { board: name, cover: cover, position: position } }
                );
            status = "board rename successful";
        }
        res.send({ status });
    } catch (error) {
        console.log(`${error} error in create`);
    } finally {
        client.close();
    }
};

/**
 * Removing data from boards
 */
export const remove = async (req, res, next) => {
    try {
        let nhei = await connect();
        let { type, name, parent } = req.body;
        let status;
        name = name.trim();
        if (type === "section") {
            let deleted = await nhei
                .collection("boards")
                .updateOne(
                    { board: parent },
                    { $pull: { sections: { section: name } } }
                );
            console.log(deleted);
            status = "section deleted";
        } else {
            let deleted = await nhei
                .collection("boards")
                .deleteOne({ board: name });
            console.log(deleted);
            status = "board deleted";
        }
        console.log(req.body);
        res.send({ status });
    } catch (error) {
        console.log(`${error} error in edit`);
    } finally {
        client.close();
    }
};

export const deletePin = async (req, res, next) => {
    let { id, board, section } = req.body;
    let status = "deleted";
    // console.log(req.body);
    let nhei = await connect();
    if (section) {
        let deleted = await nhei.collection("boards").updateOne(
            {
                board: board,
                "sections.section": section,
            },
            {
                $pull: { "sections.$.pins": { id: id } },
                $inc: {
                    "sections.$.total": -1,
                },
            }
        );
        if (deleted.modifiedCount === 1) {
            await nhei
                .collection("boards")
                .updateOne({ board }, { $inc: { total: -1 } });
            await nhei
                .collection("doujins")
                .updateOne({ id: id }, { $inc: { copy: -1 } });
        }
        console.log(deleted);
    } else {
        let deleted = await nhei
            .collection("boards")
            .updateOne({ board: board }, { $pull: { pins: { id: id } } });
        if (deleted.modifiedCount === 1) {
            await nhei
                .collection("boards")
                .updateOne({ board }, { $inc: { total: -1 } });
            await nhei
                .collection("doujins")
                .updateOne({ id: id }, { $inc: { copy: -1 } });
        }
        console.log(deleted);
    }
    res.send({ status });
};

/**
 * Adding doujin data to respective board and section
 */

export const add = async (req, res, next) => {
    try {
        let nhei = await connect();
        let { id, doujin, addData } = req.body;
        let status = `saved successfully`;
        let inserted;
        let data = {
            id: id,
            cover: addData.cover,
            favourites: addData.favourites,
        };
        let present = await nhei.collection("doujins").findOne({ id: id });
        if (present === null) {
            await nhei.collection("doujins").insertOne(doujin);
        }

        if (addData.section) {
            inserted = await nhei.collection("boards").updateOne(
                {
                    board: addData.board,
                    "sections.section": addData.section,
                },
                {
                    $addToSet: {
                        "sections.$.pins": data,
                    },
                    $inc: {
                        "sections.$.total": 1,
                    },
                }
            );
            if (inserted.modifiedCount === 1) {
                await nhei
                    .collection("boards")
                    .updateOne(
                        { board: addData.board },
                        { $inc: { total: 1 } }
                    );
                await nhei
                    .collection("doujins")
                    .updateOne({ id: id }, { $inc: { copy: 1 } });
            }
        } else {
            inserted = await nhei.collection("boards").updateOne(
                {
                    board: addData.board,
                },
                { $addToSet: { pins: data } }
            );
            if (inserted.modifiedCount === 1) {
                await nhei
                    .collection("boards")
                    .updateOne(
                        { board: addData.board },
                        { $inc: { total: 1 } }
                    );
                await nhei
                    .collection("doujins")
                    .updateOne({ id: id }, { $inc: { copy: 1 } });
            }
        }
        if (inserted.modifiedCount === 0) {
            status = "already present";
        }
        console.log("hell");
        addToThumbs(nhei, id, addData.cover);
        res.send({ status });
    } catch (error) {
        console.log(error);
    }
};

export const isPresent = async (id) => {
    console.log(id);
    let nhei = await connect();
    let copy = await nhei
        .collection("doujins")
        .findOne({ id: +id }, { copy: 1 });
    console.log(copy);
    if (copy === null) {
        return false;
    }
    if (copy.copy === 0) {
        return false;
    }
    return true;
};

const addToThumbs = async (nhei, id, cover) => {
    let found = await nhei.collection("thumbs").findOne({ id, cover });
    if (found === null) {
        nhei.collection("thumbs").insertOne({ id, cover });
        console.log("added to thumbs");
    }
};

export const getThumbs = async (req, res, next) => {
    let nhei = await connect();
    let cursor = nhei.collection("thumbs").find({}, { cover: 1 });
    let data = await cursor.toArray();
    data = data.map((record) => record.cover);
    res.send({ data });
};
/**
 * Function to cache the doujin data in redis database
 */
export const getFromDoujinSearchCache = async (req, res, next) => {
    /**
     * storing id from request body into local variable
     */
    let { id } = req.body;
    /**
     * Retrieving the cached doujin data if available
     */
    redis.get(id, async (err, data) => {
        if (err) throw err;
        if (data !== null) {
            console.log(`fetching ${id} from doujinSearchCache`);
            let present = await isPresent(id);
            res.send({ data: JSON.parse(data), present });
            console.log(`fetching ${id} completed`);
        } else {
            next();
        }
    });
};

/**
 * Function to fetch doujin data using the nhentai api
 */
export const searchDoujin = async (req, res, next) => {
    try {
        /**
         * storing id from request body into local variable
         */
        let { id } = req.body;
        let api = new API();
        let request = await api.fetchDoujin(id);

        let present = await isPresent(id);
        console.log(`fetching doujin info of ${id}`);
        /**
         * Initiating new nhentai api instance.
         * Fetching the data and storing in new object.
         */
        let data = {
            id: request.id,
            url: request.url,
            cover: request.thumbnail.url,
            title: request.titles?.pretty,
            author: request.tags.artists[0]?.name,
            language: request.tags.languages[0].name,
            parody: request.tags.parodies[0]?.name,
            pages: request.pages,
            count: request.length,
            favourites: request.favorites,
            copy: 0,
        };
        /**
         * Caching the retrived doujin data into the redia database.
         */
        console.log(`caching doujin ${id}`);
        redis.set(id, JSON.stringify(data));
        console.log(`caching ${id} completed`);
        res.send({ data, present });
        return;
    } catch (err) {
        console.log(err);
    }
};

export const getBackup = async () => {
    let nhei = await connect();
    let boardsCursor = nhei.collection("boards").find();
    let doujinCursor = nhei.collection("doujins").find();
    let boards = await boardsCursor.toArray();
    let doujins = await doujinCursor.toArray();
    return { boardData: boards, doujinData: doujins };
};
