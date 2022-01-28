import { writable } from "svelte/store";

export const store = writable();

export const getDoujin = async (searchId) => {
    let request = await fetch(`http://localhost:5000/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            id: searchId,
        }),
    });
    let response = await request.json();
    return store.set(response);
};
