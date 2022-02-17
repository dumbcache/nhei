import { google } from "googleapis";
import { keys } from "./credentials.js";
import { getBackup } from "./nhei.js";

const scopes = ["https://www.googleapis.com/auth/drive"];

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
    console.log("connection eshtablished");
});

const drive = google.drive({ version: "v3", auth: auth });

export const backupData = async () => {
    drive.files.list(
        { q: "name contains 'json'", fields: "files(id,name)" },

        (err, res) => {
            if (err) return console.log("The API returned an error: " + err);
            const files = res.data.files;
            backup(files);
        }
    );
};

export const updateBackupFiles = (id, media) => {
    drive.files.update({ fileId: id, media: media }, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("inserted", res.data);
    });
};

const backup = async (files) => {
    const { boardData, doujinData } = await getBackup();
    let boardMedia = {
        mimeType: "application/json",
        body: boardData,
    };
    let doujinMedia = {
        mimeType: "application/json",
        body: doujinData,
    };
    updateBackupFiles(files[0].id, doujinMedia);
    updateBackupFiles(files[1].id, boardMedia);
};
