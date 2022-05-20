import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { edit, remove, add, deletePin, getThumbs } from "./nhei.js";

import {
    searchHandler,
    getSectionsHandler,
    getBoardsHandler,
    getDoujinHandler,
    searchCacheHandler,
    createHandler,
    createBoardHandler,
    createsectionHandler,
} from "./handlers.js";

let app = express();
let port = 3000;

// let doBackup = setInterval(() => {
//     backup();
// }, 43200000);

app.use(cors());
app.use(bodyParser.json());

app.post("/search", searchCacheHandler, searchHandler);

app.get("/boards", getBoardsHandler);
app.post("/boards/create", createBoardHandler);
app.post("/sections", getSectionsHandler);
app.post("/sections/create", createsectionHandler);
app.post("/doujin", getDoujinHandler);
app.post("/create", createHandler);

app.post("/add", add);
app.post("/edit", edit);
app.post("/delete", remove);
app.put("/delete", deletePin);
app.get("/thumbs", getThumbs);

app.listen(port, () => console.log(`listening at port ${port}`));
