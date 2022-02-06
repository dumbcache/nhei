import { writable } from "svelte/store";

export const navHistory = writable({});
export const searchValue = writable("");
export const doujin = writable();
export const boards = writable();
export const pinss = writable();

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
    pinss.set(await response.json());
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

export const collections = writable([
    { name: "favourites" },
    { name: "AOT" },
    { name: "JJK" },
    { name: "OnePiece" },
    { name: "favourites" },
    { name: "AOT" },
    { name: "JJK" },
    { name: "OnePiece" },
]);
export const sections = writable([
    { name: "Aqua" },
    { name: "Darkness" },
    { name: "Megumin" },
    { name: "YunYun" },
]);
export const pins = writable([
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
]);

export const nheiData = writable([
    { name: "favourites" },
    { name: "AOT" },
    { name: "JJK" },
    { name: "OnePiece" },
]);
