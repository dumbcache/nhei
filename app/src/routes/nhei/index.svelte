<script context="module">
    import { fetchBoards } from "$lib/scripts/stores.js";
    export async function load({ fetch }) {
        console.log("inside layout");
        await fetchBoards();
        return {
            props: {},
        };
    }
</script>

<script>
    import Navigation from "$lib/components/Navigation.svelte";
    import { boards } from "$lib/scripts/stores.js";
    import Card from "$lib/components/Card.svelte";
</script>

<svelte:head>
    <title>dCache . nhei</title>
</svelte:head>
<Navigation />

{#if Boolean($boards.boards) != false}
    {#each $boards.boards as card}
        <div>
            <Card {card} />
        </div>
    {/each}
{/if}

<style>
    div {
        width: 100px;
    }
</style>
