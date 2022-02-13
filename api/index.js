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
    getDoujin,
} from "./nhei.js";

let app = express();
let port = 80;

app.use(cors());
app.use(bodyParser.json());

/**
 * Sending nhei boards and sections data
 */
app.get("/", getBoards);

app.post("/doujin", getDoujin);
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
app.listen(port, () => console.log(`listening at port ${port}`));
