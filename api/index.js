import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { cacheDoujinInfo, fetchDoujinInfo } from "./scripts/fetchDoujin.js";

let app = express();
let port = 80;

app.use(cors());
app.use(bodyParser.json());

/**
 * Initial root
 */
app.get("/", (req, res) => {
    res.send({ message: "server running" });
});

/**
 * Route to get particular doujin from id
 */
app.post("/", cacheDoujinInfo, fetchDoujinInfo);

/**
 * App listening at port
 */
app.listen(port, () => console.log(`listening at port ${port}`));
