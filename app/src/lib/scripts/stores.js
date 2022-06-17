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
                fav: "3737",
                time: "1653044668",
                cover: "cover",
                ext: "jpg",
            },
        ],
    },
];

export let boardStore = writable(null);
export let sectionStore = writable(null);
export let pinStore = writable(null);

export let search = writable("");
export let overlay = writable(false);

export function nheiRouteHistory(pathname) {
    let arr = pathname.replaceAll("/", " ").trim().split(" ");
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let slice = arr.slice(0, i + 1);
        result.push({ path: `/${slice.join("/")}`, name: arr[i] });
    }
    return result;
}
/********************************************************/

export async function fetchBoards(fetchWrapper) {
    let data;
    if (browser) {
        let fetch = fetchWrapper ?? window.fetch;
        console.log("checking if boards present locally");
        if (window.localStorage.getItem("boards")) {
            console.log("boards present locally");
            data = JSON.parse(window.localStorage.getItem("boards"));
            boardStore.set(data);
            return data;
        }
        console.log("boards not present locally");
        data = await refreshBoards(fetch);
        return data;
    }
    return;
}

export async function refreshBoards(fetch) {
    try {
        console.log("fetching boards from server");
        let req = await fetch("http://localhost:8080/boards");
        if (req.ok) {
            console.log("fetching completed");
            let boards = await req.json();
            window.localStorage.setItem("boards", JSON.stringify(boards));
            boardStore.set(boards);
            console.log(boards);
            return boards;
        }
    } catch (error) {
        console.log("error while fetching boards from server", err);
    }
}

/********************************************************/
export async function fetchSections(board, fetchWrapper) {
    let data;
    if (browser) {
        let fetch = fetchWrapper ?? window.fetch;
        console.log("checking if sections present locally");
        if (window.sessionStorage.getItem(board)) {
            console.log("sections present locally");
            data = JSON.parse(window.sessionStorage.getItem(board));
            sectionStore.set(data);
            return data;
        }
        console.log("sections not present locally");
        data = await refreshSections(board, fetch);
        return data;
    }
    return;
}

export async function refreshSections(board, fetch) {
    try {
        console.log("fetching sections from server");
        let req = await fetch("http://localhost:8080/sections", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ board }),
        });
        console.log(req.ok);
        if (req.ok) {
            console.log("fetching completed");
            let { sections } = await req.json();
            window.sessionStorage.setItem(board, JSON.stringify(sections));
            sectionStore.set(sections);
            console.log(sections);
            return sections;
        }
        return;
    } catch (error) {
        console.log("error while fetching sections from server", err);
    }
}

/********************************************************/

export async function fetchPinsFromBoard(boardName) {
    if (browser) {
        console.log("checking if pins present locally");
        if (window.localStorage.getItem("boards")) {
            console.log("checking if pins present locally");
            let { boards } = JSON.parse(window.localStorage.getItem("boards"));
            data = boards.filter((board) => board.name === boardName);
            console.log(data, data[0]);
            let { pins, pCount, sCount } = data[0];
            console.log(pins);
            data = { pins, pCount, sCount };
            pinStore.set(data);
            return data;
        }
        console.log("pins not present locally");
        return;
    }
}

export async function fetchPinsFromSection([boardName, sectionName]) {
    if (browser) {
        console.log("checking if pins present locally");
        if (window.sessionStorage.getItem(boardName)) {
            console.log("checking if pins present locally");
            let data = JSON.parse(window.sessionStorage.getItem(boardName));
            data = data.filter(
                (section) =>
                    section.board === boardName && section.name === sectionName
            );
            console.log(data, data[0]);
            let { pins, pCount } = data[0];
            console.log(pins);
            pinStore.set({ pins, pCount });
            return { pins, pCount };
        }
        console.log("pins not present locally");
        return;
    }
}
