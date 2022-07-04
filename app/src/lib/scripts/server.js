export async function sendEditPinData(data) {
    let req = await fetch("http://localhost:8080/pins/edit", {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: {
            data,
        },
    });
    let reponse = await req.json();
}
