<script context="module">
    export async function load({ params, fetch }) {
        let req = await fetch(`http://localhost:8080/`, {
            method: "POST",
            Headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                board: params.section,
            }),
        });
        let data = await req.text();
        console.log(data);
        return {
            props: { data },
        };
    }
</script>

<h1>sections</h1>
