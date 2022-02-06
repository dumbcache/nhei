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

export const connect = async () => {
    try {
        await client.connect();
        return client.db("nhei");
    } catch (error) {
        console.log(error);
    }
};
// export const create = async (req, res, next) => {
//     try {
//         let { type, name } = req.data;
//         await client.connect();
//         let nhei = client.db("nhei").collection("boards");

//         if (type === board) {
//             let exits = nhei.findOne({_id:name})
//         }
//         nhei.insertOne(doujin);
//         await result.forEach(console.dir);
//     } catch (error) {
//         console.log(error);
//     } finally {
//         await client.close();
//     }
// };

export const getBoards = async (req, res, next) => {
    let nhei = await connect();
    let cursor = nhei.collection("boards").find();
    let boards = await cursor.toArray();
    console.log(boards);
    res.send(boards);
};
