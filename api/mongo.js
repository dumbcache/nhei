import { MongoClient } from "mongodb";

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
