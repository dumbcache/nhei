<script context="module">
    import { fetchSections, fetchPinsFromBoard } from "$lib/scripts/stores.js";
    export async function load({ params, fetch }) {
        let board = params.board;
        console.log(board);
        let fetchedSections = await fetchSections(board, fetch);
        let fetchedPins = await fetchPinsFromBoard(board);
        return {
            props: { fetchedSections, fetchedPins },
        };
    }
</script>

<script>
    import Navigation from "$lib/components/Navigation.svelte";
    import Card from "$lib/components/Card.svelte";
    import Pin from "$lib/components/Pin.svelte";
    import { page } from "$app/stores";
    import { sectionStore } from "$lib/scripts/stores.js";

    let { pathname } = $page.url;
    export let fetchedSections, fetchedPins;
    let data = $sectionStore ?? fetchedSections;
    let boardName = $page.params.board;
    $: console.log("boardname", boardName);
</script>

<Navigation
    pCount={fetchedPins.pCount}
    sCount={fetchedPins.sCount}
    {boardName}
/>

{#if data}
    <div class="cards">
        {#each data as section}
            <div class="card-wrapper">
                <Card card={section} {pathname} />
            </div>
        {/each}
    </div>
{/if}
{#if fetchedPins.pins}
    <div class="pins">
        {#each fetchedPins.pins as entry}
            <div class="pin-wrapper">
                <Pin
                    pin={{
                        m_id: entry.m_id,
                        cover: "thumb",
                    }}
                />
            </div>
        {/each}
    </div>
{/if}
