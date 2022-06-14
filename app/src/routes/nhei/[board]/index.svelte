<script context="module">
    export async function load({ params }) {
        let board = params.board;
        let req = await fetch(`http://localhost:8080/sections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                board,
            }),
        });
        let data = await req.json();
        return {
            props: { data: data[0], board },
        };
    }
</script>

<script>
    import Navigation from "$lib/components/Navigation.svelte";
    import Card from "$lib/components/Card.svelte";
    import Pin from "$lib/components/Pin.svelte";
    import { page } from "$app/stores";
    let { pathname } = $page.url;
    export let data, board;
    console.log(data);
</script>

<Navigation />

<h1>sections</h1>
{#if data.sections}
    {#each data.sections as section}
        <a href={`${pathname}/${section.name}`}>
            <Card card={section} />
        </a>
    {/each}
{/if}
{#if data.pins}
    {#each data.pins as pin}
        <Pin card={pin} />
    {/each}
{/if}
