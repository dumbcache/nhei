import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

export const connect = async () => {
    try {
        await client.connect();
        return client.db("nheidev");
    } catch (error) {
        console.log("error while connecting");
        return error;
    }
};

export const close = async () => {
    try {
        await client.close();
    } catch (error) {
        console.log("error while closing");
        return error;
    }
};

console.log(await connect());

export const getDoujin = async (req, res, next) => {
    try {
        let { id } = req.body;
        let nhei = await connect();
        let doujin = await nhei.collection("doujins").findOne({ id: id });
        if (doujin !== undefined) {
            console.log("doujin exists");
            res.send(doujin);
        }

        let data = fetchDoujin();
        console.log(`caching doujin ${id} `);
        redis.set(id, JSON.stringify(data));
        console.log(`caching ${id} completed`);
    } catch (error) {
        console.log(error);
        res.sendStatus(503);
    } finally {
        close();
    }
};
