import { writable } from "svelte/store";

export default function getDoujin(searchId) {
    const store = writable(new Promise(() => {}));
    const load = async () => {
        let request = await fetch(`http://localhost:5000/`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                id: searchId,
            }),
        });
        let response = await request.json();
        store.set(Promise.resolve(response));
    };
    load();
    return store;
}
