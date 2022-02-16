import fs from "fs";
import { getBackup } from "./nhei.js";
import { insertBackup } from "./drive.js";

// const { boardData, douinData } = getBackup();

fs.writeFile(
    "./backup/boardDataBackup.json",
    JSON.stringify(boardData),
    (err, file) => {
        if (err) {
            throw err;
        }
        console.log("data backed");
    }
);
fs.writeFile(
    "./backup/doujinDataBackup.json",
    JSON.stringify(douinData),
    (err, file) => {
        if (err) {
            throw err;
        }
        console.log("data backed");
    }
);
