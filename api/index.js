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

import {
    searchHandler,
    getSectionsHandler,
    getBoardsHandler,
} from "./handlers.js";

let app = express();
let port = 3000;

// let doBackup = setInterval(() => {
//     backup();
// }, 43200000);

app.use(cors());
app.use(bodyParser.json());

app.post("/search", searchHandler);

app.get("/boards", getBoardsHandler);
app.get("/sections", getSectionsHandler);

app.post("/doujin", getFromDoujinCache, getDoujin);
app.post("/", getFromDoujinSearchCache, searchDoujin);
app.post("/add", add);
app.post("/create", create);
app.post("/edit", edit);
app.post("/delete", remove);
app.put("/delete", deletePin);
app.get("/thumbs", getThumbs);

app.listen(port, () => console.log(`listening at port ${port}`));
