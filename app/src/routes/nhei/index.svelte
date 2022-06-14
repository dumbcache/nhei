<script context="module">
    import { fetchBoards } from "$lib/scripts/stores.js";
    export async function load() {
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
    import { page } from "$app/stores";
    let { pathname } = $page.url;
</script>

<svelte:head>
    <title>dCache . nhei</title>
</svelte:head>

<Navigation title="NHei" />
{#if Boolean($boards.boards) != false}
    {#each $boards.boards as card}
        <div>
            <a href={`${pathname}/${card.name}`}>
                <Card {card} />
            </a>
        </div>
    {/each}
{/if}

<style>
    div {
        width: 100px;
    }
</style>
