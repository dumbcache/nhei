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

<Navigation title="NHei" />
{#if Boolean(data) != false}
    <div class="cards">
        {#each data as card}
            <div class="card-wrapper">
                <a href={`${pathname}/${card.name}`}>
                    <Card {card} />
                </a>
            </div>
        {/each}
    </div>
{/if}

<style>
</style>
