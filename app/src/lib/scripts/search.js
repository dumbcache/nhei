export async function globalSearch(q) {
    console.log(q);
    let req = await fetch("http://localhost:8080/search", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ q }),
    });
    let { data } = await req.json();
    return data;
}
