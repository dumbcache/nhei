import {
    getBoards,
    getDoujin,
    createBoard,
    createSection,
    addDoujin,
    addPin,
    deleteBoard,
    deleteSection,
    deletePin,
} from "./mongo.js";
import { fetchDoujinFromAPI, searchFromAPI } from "./nhei.js";
import { getFromCache, setToCache } from "./redis.js";

export const searchCacheHandler = async (req, res, next) => {
    try {
        let { q } = req.body;
        if (isNaN(Number(q))) next();
        let doujin = getFromCache(Number(q));
        doujin ?? next();
    } catch (error) {
        console.log(error);
        next();
    }
};

export const searchHandler = async (req, res) => {
    try {
        let { q } = req.body;
        let data;
        console.log(typeof q);
        if (isNaN(Number(q))) {
            data = await searchFromAPI(q);
            res.status(200).send(data);
        } else {
            data = await fetchDoujinFromAPI(Number(q));
            res.status(200).send([data.doujin]);
        }
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

export const getDoujinHandler = async (req, res) => {
    try {
        let { id } = req.body;
        let doujin;
        doujin = await getDoujin(id);
        if (doujin !== undefined) {
            console.log("doujin exists");
            res.status(200).send(doujin);
        }
        let data = fetchDoujinFromAPI(id);
        // setToCache(id, JSON.stringify(data));
        res.status(200).send([data.doujin]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const createHandler = async (req, res) => {
    try {
        let { board, section } = req.body;
        let status = createBoard(board);
        if (!section) return status;
        status = createSection(board, section);
        res.status(200).send({ status });
    } catch (error) {
        console.log(`error while creating boards`);
        throw error;
    }
};
export const createBoardHandler = async (req, res) => {
    try {
        let { board } = req.body;
        let status = createBoard(board);
        res.status(200).send({ status });
    } catch (error) {
        console.log(`error while creating boards`);
        throw error;
    }
};
export const createSectionHandler = async (req, res) => {
    try {
        let { board, section } = req.body;
        let status = createSection(board, section);
        res.status(200).send({ status });
    } catch (error) {
        console.log(`error while creating boards`);
        throw error;
    }
};

export const createPinHandler = async (req, res) => {
    try {
        let { board, section, id } = req.body;
        let { doujin, pin } = await fetchDoujinFromAPI(id);
        let status = addPin(board.trim(), section.trim(), pin);
        addDoujin(doujin, id);
        res.status(200).send({ status });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const editBoardHandler = async (req, res) => {
    try {
        let { board } = req.body;
        let status = createBoard(board);
        res.status(200).send({ status });
    } catch (error) {
        console.log(`error while creating boards`);
        throw error;
    }
};

export const editSectionHandler = async (req, res) => {
    try {
        let { board, section } = req.body;
        let status = editSection(board, section);
        res.status(200).send({ status });
    } catch (error) {
        console.log(`error while creating boards`);
        throw error;
    }
};
export const deleteBoardHandler = async (req, res) => {
    try {
        let { board } = req.body;
        let status = editBoard(board);
        res.status(200).send({ status });
    } catch (error) {
        console.log(`error while creating boards`);
        throw error;
    }
};
export const deleteSectionHandler = async (req, res) => {
    try {
        let { board, section } = req.body;
        let status = deleteSection(board, section);
        res.status(200).send({ status });
    } catch (error) {
        console.log(`error while creating boards`);
        throw error;
    }
};

export const deletePinHandler = async (req, res) => {
    try {
        let { board, section, id } = req.body;
        let status = deletePin(board.trim(), section.trim(), id);
        res.status(200).send({ status });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
