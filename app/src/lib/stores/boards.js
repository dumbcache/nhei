import { writable } from "svelte/store";
import { browser } from "$app/env";

let boardData = browser
    ? window.localStorage.getItem("boards")
    : await fetchBoards();

export const boards = writable("");

export async function fetchBoards() {
    if (browser) {
        console.log("browser");
        let req = await fetch("http://localhost:8080/boards");
        let data = await req.json();
        window.localStorage.setItem("boards", data);
        boards.set(data);
        return boards;
    }
    return null;
}
