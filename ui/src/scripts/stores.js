import { writable } from "svelte/store";

export const searchValue = writable("");
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
