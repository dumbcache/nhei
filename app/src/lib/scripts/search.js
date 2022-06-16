export async function globalSearch(q) {
    let search = `search@${q}`;
    if (window.sessionStorage.getItem(search)) {
        console.log("fetching from session storage");
        let data = JSON.parse(window.sessionStorage.getItem(search));
        return data;
    }
    let req = await fetch("http://localhost:8080/search", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ q }),
    });
    let { data } = await req.json();
    window.sessionStorage.setItem(search, JSON.stringify(data));
    return data;
}
