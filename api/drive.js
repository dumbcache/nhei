import { google } from "googleapis";
import { keys } from "./credentials.js";
import fs from "fs";

const scopes = ["https://www.googleapis.com/auth/drive"];

let mimeType = "application/vnd.google-apps.script+json";
const auth = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    scopes
);

auth.authorize((err) => {
    if (err) {
        console.log(new Error("Error,", err));
    }
    err;
    console.log("connectin eshtablished");
});

const drive = google.drive({ version: "v3", auth: auth });

let getlist = () => {
    drive.files.list(
        {},

        (err, res) => {
            if (err) return console.log("The API returned an error: " + err);
            const files = res.data.files;
            console.log(files);
        }
    );
};
const parent = "1S72AXXefah190EaEduMhR4j9VusHx5xB";
let data = { data: "data" };
var fileMetadata = {
    name: "backup.json",
    parents: [parent],
};
var media = {
    mimeType: "text/plain",
    body: fs.createReadStream("./backup/boardDataBackup.json"),
};
// drive.files.update({ resource: fileMetadata, media: media }, (err, file) => {
//     console.log(err);
// });

getlist();

export const insertBackup = () => {};
