import { API } from "nhentai";
import "dotenv/config";
import { connect, close } from "./mongo.js";
import { Pin } from "./types.js";
/**
 * Creating new database instance
 */
// const redis = new Redis({
//     port: process.env.REDIS_PORT,
//     host: process.env.REDIS_HOST,
//     password: process.env.REDIS_PASS,
// });
// const url = process.env.MONGO_CONNECTION;
// const url = "mongodb://nhei:nhei@mongo:27017";

export const getBoards = async (req, res, next) => {
    try {
        let nhei = await connect();
        let cursor = nhei.collection("boards").find();
        let boards = await cursor.toArray();
        console.log("requested for boards");
        res.send(boards);
        close();
    } catch (error) {
        console.log(`error in getBoards\n ${error}`);
        res.send("");
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

/**
 * Adding doujin data to respective board and section
 */

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

export const getBackup = async () => {
    let nhei = await connect();
    let boardsCursor = nhei.collection("boards").find();
    let doujinCursor = nhei.collection("doujins").find();
    let boards = await boardsCursor.toArray();
    let doujins = await doujinCursor.toArray();
    return { boardData: boards, doujinData: doujins };
};

export const fetchDoujinFromAPI = async (id) => {
    let api = new API();
    let doujin = await api.fetchDoujin(id);
    delete doujin.raw;
    delete doujin.scanlator;
    doujin.tags = doujin.tags.all;
    doujin.copies = 1;
    let pin = new Pin(
        doujin.id,
        doujin.favorites,
        doujin.uploadTimestamp,
        doujin.cover
    );
    return { doujin, pin };
};

export const searchFromAPI = async (q) => {
    let api = new API();
    let res = await api.search(q, 1, "popular");
    res.doujins.forEach((doujin) => {
        delete doujin.raw;
        delete doujin.scanlator;
        doujin.tags = doujin.tags.all;
    });
    return res.doujins;
};
