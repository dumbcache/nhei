import { MongoClient } from "mongodb";
import Redis from "ioredis";
import { API } from "nhentai";

/**
 * Creating new database instance
 */
const redis = new Redis("redis://:nhei@redis:6379");
const url = "mongodb://nhei:nhei@mongo:27017";

let client = new MongoClient(url);

export const connect = async () => {
    try {
        await client.connect();
        return client.db("nhei");
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
        console.log(boards);
        res.send(boards);
        close();
    } catch (error) {
        console.log(`${error} error in getBoards`);
    }
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
        .findOne({ board: board, sections: { $in: [section] } });
    console.log(found);
    if (found !== null) {
        return true;
    } else {
        return false;
    }
};
export const create = async (req, res, next) => {
    try {
        let nhei = await connect();
        let { board, section } = req.body;
        let status;
        board = board.trim();
        section = section.trim();
        console.log(board, section);

        if (board.length === 0) {
            res.send("board empty");
            return;
        }

        let boardStatus = await isBoardPresent(nhei, board);

        if (boardStatus) {
            status = "Board present";
        } else {
            await nhei
                .collection("boards")
                .insertOne({ board: board, sections: [] });
            status = "Board created";
        }

        if (section.length !== 0) {
            let sectionStatus = await isSectionPresent(nhei, board, section);
            if (sectionStatus) {
                status = "section present";
            } else {
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

export const edit = async (req, res, next) => {
    try {
        let nhei = await connect();
        let { type, previous, name, parent } = req.body;
        let status;
        previous = previous.trim();
        parent = parent.trim();
        if (type === "section") {
            let inserted = await nhei
                .collection("boards")
                .updateOne(
                    { board: parent, sections: previous },
                    { $set: { "sections.$": name } }
                );
            console.log(inserted);
            status = "section rename successful";
        } else {
            await nhei
                .collection("boards")
                .updateOne({ board: previous }, { $set: { board: name } });
            status = "board rename successful";
        }
        res.send({ status });
    } catch (error) {
        console.log(`${error} error in create`);
    } finally {
        client.close();
    }
};

export const remove = async (req, res, next) => {
    try {
        let nhei = await connect();
        let { type, name, parent } = req.body;
        let status;
        name = name.trim();
        if (type === "section") {
            let deleted = await nhei
                .collection("boards")
                .updateOne({ board: parent }, { $pull: { sections: name } });
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
        console.log(`${error} error in create`);
    } finally {
        client.close();
    }
};

export const add = async (req, res, next) => {
    try {
        let nhei = await connect();
        let doujin = req.body;
        console.log(req.body.data);
        await nhei.collection("doujins").insertOne(doujin);
        res.send();
    } catch (error) {
        console.log(error);
    }
};

/**
 * Function to cache the doujin data in redis database
 */
export const cacheDoujinInfo = async (req, res, next) => {
    /**
     * storing id from request body into local variable
     */
    let { id } = req.body;
    /**
     * Retrieving the cached doujin data if available
     */
    redis.get(id, (err, data) => {
        if (err) throw err;
        if (data !== null) {
            console.log(`caching doujin info of ${id}`);
            res.send(data);
            console.log("completed");
        } else {
            next();
        }
    });
};

/**
 * Function to fetch doujin data using the nhentai api
 */
export const fetchDoujinInfo = async (req, res, next) => {
    try {
        /**
         * storing id from request body into local variable
         */
        let { id } = req.body;
        console.log(`fetching doujin info of ${id}`);
        /**
         * Initiating new nhentai api instance.
         * Fetching the data and storing in new object.
         */
        let api = new API();
        let request = await api.fetchDoujin(id);
        doujin = {
            id: request.id,
            url: request.url,
            cover: request.thumbnail.url,
            title: request.titles?.pretty,
            author: request.tags.artists[0]?.name,
            language: request.tags.languages[0].name,
            parody: request.tags.parodies[0]?.name,
            pages: request.pages,
        };
        /**
         * Caching the retrived doujin data into the redia database.
         */
        redis.set(id, JSON.stringify(doujin));
        res.send(doujin);
        return;
    } catch (err) {
        console.log(err);
    }
};
