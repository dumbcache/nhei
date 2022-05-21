import { API } from "nhentai";
import { connect, close } from "./mongo.js";
import { Pin } from "./types.js";

export const isPresent = async (id) => {
    console.log(id);
    let nhei = await connect();
    let copy = nhei.collection("doujins").findOne({ id: +id }, { copy: 1 });
    console.log(copy);
    if (copy === null) {
        return false;
    }
    if (copy.copy === 0) {
        return false;
    }
    return true;
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
    try {
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
    } catch (error) {
        console.log("error while fetching doujin from api");
        throw error;
    }
};

export const searchFromAPI = async (q) => {
    try {
        let api = new API();
        let res = await api.search(q, 1, "popular");
        res.doujins.forEach((doujin) => {
            delete doujin.raw;
            delete doujin.scanlator;
            doujin.tags = doujin.tags.all;
        });
        return res.doujins;
    } catch (error) {
        console.log("error while searching doujin from api");
        // throw error;
        return error;
    }
};
