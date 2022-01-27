import { MongoClient } from "mongodb";

const url = "mongodb://nhei:nhei@mongo:27017";

const client = new MongoClient(url);

export const run = async (doujin) => {
    try {
        await client.connect();
        let nhei = client.db("nhei").collection("nhei");
        nhei.insertOne(doujin);
        await result.forEach(console.dir);
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
};
