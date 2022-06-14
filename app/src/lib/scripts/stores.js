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
export let overlay = writable(false);

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
    try {
        let req = await fetch("http://localhost:8080/boards");
        console.log(req.ok);
        if (req.ok) {
            let data = await req.json();
            window.localStorage.setItem("boards", JSON.stringify(data[0]));
            boards.set(JSON.parse(boardData));
        }
    } catch (error) {
        console.log("error while fetching");
    }
}

export function nheiRouteHistory(pathname) {
    console.log(pathname);
    let arr = pathname.replaceAll("/", " ").trim().split(" ");
    console.log(arr);
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let slice = arr.slice(0, i + 1);
        console.log(`/${slice.join("/")}`);
        result.push({ path: `/${slice.join("/")}`, name: arr[i] });
    }
    console.log(result);
    return result;
}
