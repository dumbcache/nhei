export async function get() {
    let data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    let json = await data.json();

    return {
        body: { json },
    };
}
