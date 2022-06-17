<script context="module">
    import { fetchBoards } from "$lib/scripts/stores.js";
    export async function load({ fetch }) {
        let fetchData = await fetchBoards(fetch);
        return {
            props: { fetchData },
        };
    }
</script>

<script>
    import Navigation from "$lib/components/Navigation.svelte";
    import { boardStore } from "$lib/scripts/stores.js";
    import Card from "$lib/components/Card.svelte";
    import { page } from "$app/stores";

    let { pathname } = $page.url;
    (async () => await fetchBoards())();
    export let fetchData;
    let data = $boardStore ?? fetchData;
</script>

<Navigation title="NHei" bCount={data.bCount} />
{#if Boolean(data.boards) != false}
    <div class="cards">
        {#each data.boards as card}
            <div class="card-wrapper">
                <Card {card} {pathname} />
            </div>
        {/each}
    </div>
{/if}

<style>
</style>
