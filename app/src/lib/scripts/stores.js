import { writable } from "svelte/store";
import { browser } from "$app/env";

let data = [
    {
        name: "konosuba",
        cover: "https://t.nhentai.net/galleries/2014946/thumb.jpg",
        time: "1653044668",
        sCount: "1",
        pCount: "1",
        pins: [
            {
                id: "373744",
                m_id: "2014946",
                cover: "cover",
                fav: "3737",
                time: "1653044668",
            },
        ],
    },
];
export let search = writable("");
export let boards = writable(data);
export let nheiRouteHistory = writable([]);

export async function fetchBoards() {
    if (browser) {
        if (window.localStorage.getItem("boards")) {
            boards.set(JSON.parse(window.localStorage.getItem("boards")));
            return;
        }
        await refreshBoards();
        return;
    }
    return;
}

export async function refreshBoards() {
    let req = await fetch("http://localhost:8080/boards");
    let data = await req.json();
    window.localStorage.setItem("boards", JSON.stringify(data[0]));
    boards.set(JSON.parse(boardData));
}
