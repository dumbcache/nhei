import { writable } from "svelte/store";

export const navHistory = writable({});
export const searchValue = writable("");
export const activeCollection = writable();
export const activeSection = writable();
export const doujin = writable();
export const boards = writable([]);
export const pins = writable();
export const status = writable();

export const refreshStatus = () => {
    setTimeout(() => {
        status.set(undefined);
    }, 3000);
};

export const getBoards = async () => {
    let response = await fetch("http://localhost:5000/");
    boards.set(await response.json());
};

export const getPins = async (board, section) => {
    let response = await fetch("http://localhost:5000/pins", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            board,
            section,
        }),
    });
    pins.set(await response.json());
};

export const getDoujin = async (searchId) => {
    let request = await fetch(`http://localhost:5000/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            id: searchId,
        }),
    });
    let response = await request.json();
    doujin.set(response);
};

let data = {
    board: "konosuba",
    sections: [{ section: "name", pins: [] }],
    pins: [],
};
