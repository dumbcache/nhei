import express from "express";
import cors from "cors";

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
    thumbsHandler,
} from "./handlers.js";

let app = express(),
    port = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({ status: "running" });
});
app.post("/search", searchCacheHandler, searchHandler);
app.post("/doujin", getDoujinHandler);
app.post("/create", createHandler);
app.get("/thumbs", thumbsHandler);

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
app.patch("pins/edit", createPinHandler);

app.listen(port, () => console.log(`listening at port ${port}`));
