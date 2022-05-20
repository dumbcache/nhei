import { MongoClient } from "mongodb";
import { Board, Section } from "./types.js";

const client = new MongoClient("mongodb://localhost:27017");

export const connect = async () => {
    try {
        await client.connect();
        return client.db("nheidev");
    } catch (error) {
        console.log("error while connecting mongo");
        throw error;
    }
};

export const close = async () => {
    try {
        await client.close();
    } catch (error) {
        console.log("error while closing mongo");
        throw error;
    }
};

console.log(await connect());

export const getBoards = async () => {
    try {
        let db = await connect();
        let cursor = db.collection("nhei").find();
        let boards = await cursor.toArray();
        return boards;
    } catch (error) {
        console.log("error while fetching boards from mongo");
        throw error;
    } finally {
        close();
    }
};
export const getSections = async (board) => {
    try {
        let db = await connect();
        let cursor = db.collection("nhei").find({ "sections.board": board });
        let sections = await cursor.toArray();
        return sections;
    } catch (error) {
        console.log("error while fetching sections from mongo");
        throw error;
    } finally {
        close();
    }
};

export const getDoujin = async (id) => {
    try {
        let db = await connect();
        let doujin = db.collection("doujin").findOne({ id: id });
        return doujin;
    } catch (error) {
        console.log("error while fetching sections from mongo");
        throw error;
    } finally {
        close();
    }
};

export const isBoardPresent = async (mongo, board) => {
    let found = await mongo
        .collection("nhei")
        .findOne({ "boards.name": board });
    if (found !== null) {
        return true;
    } else {
        return false;
    }
};

export const isSectionPresent = async (mongo, board, section) => {
    let found = await mongo
        .collection("nhei")
        .findOne({ "sections.name": section, "sections.board": board });
    console.log(found);
    if (found !== null) {
        return true;
    } else {
        return false;
    }
};

export const createBoard = async (board) => {
    try {
        let mongo = await connect(),
            boardName = board.trim();
        if (!boardName) return "board name is empty";
        let boardPresent = await isBoardPresent(boardName);
        if (boardPresent) return "present";
        let newBoard = new Board(boardName);
        await mongo
            .collection("nhei")
            .updateOne({ user: "nhei" }, { $addToSet: { boards: newBoard } });
        return "created";
    } catch (error) {
        console.log("error while creating board in mongo");
        throw error;
    }
};
export const createSection = async (board, section) => {
    try {
        let mongo = await connect(),
            boardName = board.trim(),
            sectionName = section.trim();
        if (!sectionName) return "section name is empty";
        let sectionPresent = await isSectionPresent(
            mongo,
            boardName,
            sectionName
        );
        if (sectionPresent) return "present";
        let newSection = new Section(boardName, sectionName);
        await mongo
            .collection("nhei")
            .updateOne(
                { user: "nhei" },
                { $addToSet: { sections: newSection } }
            );
        return "created";
    } catch (error) {
        console.log("error while creating section in mongo");
        throw error;
    }
};
