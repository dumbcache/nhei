import { getBoards, getDoujin } from "./mongo.js";
import { fetchDoujinFromAPI, searchFromAPI } from "./nhei.js";

export const searchHandler = async (req, res) => {
    try {
        let { q } = req.body;
        let data;
        console.log(typeof q);
        if (isNaN(Number(q))) {
            data = await searchFromAPI(q);
        } else {
            data = await fetchDoujinFromAPI(Number(q));
        }
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const getBoardsHandler = async (req, res) => {
    try {
        let boards = await getBoards();
        res.status(200).send(boards);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const getSectionsHandler = async (req, res) => {
    try {
        let { board } = req.body;
        let sections = await getSections(board);
        res.status(200).send(sections);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const getDoujinHandler = async (req, res, next) => {
    try {
        let { id } = req.body;
        let doujin;
        doujin = await getDoujin(id);
        if (doujin !== undefined) {
            console.log("doujin exists");
            res.status(200).send(doujin);
        }
        doujin = fetchDoujinFromAPI(id);
        // console.log(`caching doujin ${id} to redis `);
        // redis.set(id, JSON.stringify(data));
        // console.log(`caching ${id} completed`);
        res.status(200).send(doujin);
    } catch (error) {
        console.log(error);
        res.sendStatus(503);
    }
};
