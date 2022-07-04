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
    console.log($boardStore, data);
</script>

<Navigation title="NHei" bCount={Boolean(data) ? data.bCount : 0} />
{#if data}
    <div class="cards">
        {#each data.boards as card}
            <div class="card-wrapper">
                <Card {card} {pathname} boardName={card.name} />
            </div>
        {/each}
    </div>
{/if}
{#if Boolean(data) == false}
    <div class="board-status">no data</div>
{/if}

<style>
    .board-status {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--color-icon);
        user-select: none;
    }
</style>
