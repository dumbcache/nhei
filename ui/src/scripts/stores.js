import { writable } from "svelte/store";

export const searchValue = writable("");

export const doujin = writable();

export const boards = writable([]);

export const doujinPresent = writable();

export const status = writable("");

export const activeData = writable([]);
export const defaultActiveData = writable([]);
export const activePinData = writable([]);
export const defaultActivePinData = writable([]);

export const refreshStatus = () => {
    setTimeout(() => {
        status.set("");
    }, 2000);
};

export const getBoards = async () => {
    let response = await fetch("http://localhost:3000/");
    boards.set(await response.json());
};

export const getPin = async (id) => {
    let response = await fetch("http://localhost:3000/doujin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            id,
        }),
    });
    doujin.set(await response.json());
    // console.log("hell", await response.json());
};

export const getDoujin = async (query) => {
    let request = await fetch(`http://localhost:3000/search`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            q: query,
        }),
    });
    console.log(await request.json());
    // let { data, present } = await request.json();
    doujin.set(data);
    doujinPresent.set(present);
};
