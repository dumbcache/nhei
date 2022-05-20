import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
    getBoards,
    create,
    edit,
    remove,
    add,
    getFromDoujinSearchCache,
    searchDoujin,
    deletePin,
    getThumbs,
} from "./nhei.js";
import { getDoujin } from "./mongo.js";
import { getFromDoujinCache } from "./redis.js";
import { backup } from "./backup.js";

let app = express();
let port = 3000;

// let doBackup = setInterval(() => {
//     backup();
// }, 43200000);

app.use(cors());
app.use(bodyParser.json());

/**
 * Sending nhei boards and sections data
 */
app.get("/", getBoards);

app.post("/doujin", getFromDoujinCache, getDoujin);
/**
 * Route to get particular doujin from id
 */
app.post("/", getFromDoujinSearchCache, searchDoujin);

/**
 * create collection
 */
app.post("/add", add);
/**
 * create collection
 */
app.post("/create", create);
/**
 * edit collection
 */
app.post("/edit", edit);
/**
 * delete collection
 */
app.post("/delete", remove);
/**
 * App listening at port
 */

app.put("/delete", deletePin);

app.get("/thumbs", getThumbs);

app.listen(port, () => console.log(`listening at port ${port}`));
