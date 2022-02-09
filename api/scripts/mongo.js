import { MongoClient } from "mongodb";

const url = "mongodb://nhei:nhei@mongo:27017";

const client = new MongoClient(url);

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

export const create = async (req, res, next) => {
    try {
        let { type, name } = req.data;
        await connect();
        let nhei = client.db("nhei").collection("boards");

        if (type === board) {
            let exits = nhei.findOne({ _id: name });
        }
        nhei.insertOne(doujin);
        await result.forEach(console.dir);
        close();
    } catch (error) {
        console.log(`${error} error in create`);
    }
};
