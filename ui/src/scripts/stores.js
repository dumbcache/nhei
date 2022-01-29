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
