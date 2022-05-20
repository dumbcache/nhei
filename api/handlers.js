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

export const getBoardsHandler = async () => {};

export const getSectionsHandler = async (board) => {};
