import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { edit, getThumbs } from "./nhei.js";

import {
    searchHandler,
    getSectionsHandler,
    getBoardsHandler,
    getDoujinHandler,
    searchCacheHandler,
    createHandler,
    createBoardHandler,
    createSectionHandler,
    deleteBoardHandler,
    deleteSectionHandler,
    createPinHandler,
    deletePinHandler,
    editSectionHandler,
    editBoardHandler,
} from "./handlers.js";

let app = express();
let port = 3000;

// let doBackup = setInterval(() => {
//     backup();
// }, 43200000);

app.use(cors());
app.use(bodyParser.json());

app.post("/search", searchCacheHandler, searchHandler);
app.post("/doujin", getDoujinHandler);
app.post("/create", createHandler);

app.get("/boards", getBoardsHandler);
app.post("/boards/create", createBoardHandler);
app.delete("/boards/delete", deleteBoardHandler);
app.patch("/boards/edit", editBoardHandler);

app.post("/sections", getSectionsHandler);
app.post("/sections/create", createSectionHandler);
app.delete("/sections/delete", deleteSectionHandler);
app.patch("/sections/edit", editSectionHandler);

app.put("/pins/delete", deletePinHandler);
app.post("pins/add", createPinHandler);

app.post("/edit", edit);
app.get("/thumbs", getThumbs);

app.listen(port, () => console.log(`listening at port ${port}`));
