import { MongoClient } from "mongodb";

const url = "mongodb://nhei:nhei@mongo:27017";

let client = new MongoClient(url);

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
export const isBoardPresent = async (nhei, board) => {
    let found = await nhei.collection("boards").findOne({ board: board });
    if (found !== null) {
        return true;
    } else {
        return false;
    }
};
export const isSectionPresent = async (nhei, board, section) => {
    let found = await nhei
        .collection("boards")
        .findOne({ board: board, sections: { $in: [section] } });
    console.log(found);
    if (found !== null) {
        return true;
    } else {
        return false;
    }
};
export const create = async (req, res, next) => {
    try {
        let nhei = await connect();
        let { board, section } = req.body;
        let status;
        board = board.trim();
        section = section.trim();
        console.log(board, section);

        if (board.length === 0) {
            res.send("board empty");
            return;
        }

        let boardStatus = await isBoardPresent(nhei, board);

        if (boardStatus) {
            status = "Board present";
        } else {
            await nhei
                .collection("boards")
                .insertOne({ board: board, sections: [] });
            status = "Board created";
        }

        if (section.length !== 0) {
            let sectionStatus = await isSectionPresent(nhei, board, section);
            if (sectionStatus) {
                status = "section present";
            } else {
                await nhei
                    .collection("boards")
                    .updateOne(
                        { board: board },
                        { $push: { sections: section } }
                    );
                status = "section added";
            }
        }
        res.send({ status });
    } catch (error) {
        console.log(`${error} error in create`);
    } finally {
        client.close();
    }
};

export const edit = async (req, res, next) => {
    try {
        let nhei = await connect();
        let { type, previous, name, parent } = req.body;
        let status;
        previous = previous.trim();
        parent = parent.trim();
        if (type === "section") {
            let inserted = await nhei
                .collection("boards")
                .updateOne(
                    { board: parent, sections: previous },
                    { $set: { "sections.$": name } }
                );
            console.log(inserted);
            status = "section rename successful";
        } else {
            await nhei
                .collection("boards")
                .updateOne({ board: previous }, { $set: { board: name } });
            status = "board rename successful";
        }
        res.send({ status });
    } catch (error) {
        console.log(`${error} error in create`);
    } finally {
        client.close();
    }
};

export const remove = async (req, res, next) => {
    try {
        let nhei = await connect();
        let { type, name, parent } = req.body;
        let status;
        name = name.trim();
        if (type === "section") {
            let deleted = await nhei
                .collection("boards")
                .updateOne({ board: parent }, { $pull: { sections: name } });
            console.log(deleted);
            status = "section deleted";
        } else {
            let deleted = await nhei
                .collection("boards")
                .deleteOne({ board: name });
            console.log(deleted);
            status = "board deleted";
        }
        console.log(req.body);
        res.send({ status });
    } catch (error) {
        console.log(`${error} error in create`);
    } finally {
        client.close();
    }
};
