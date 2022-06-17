<script context="module">
    import { fetchPinsFromSection } from "$lib/scripts/stores.js";
    export async function load({ url }) {
        let parents = url.pathname.replace("/nhei/", "").split("/");
        console.log(parents);
        let data = await fetchPinsFromSection(parents);
        return {
            props: { parents, data },
        };
    }
</script>

<script>
    import Navigation from "$lib/components/Navigation.svelte";
    import Pin from "$lib/components/Pin.svelte";

    export let data, parents;
    let [boardName, sectionName] = parents;
    $: console.log("parents", parents);
</script>

<Navigation {boardName} {sectionName} pCount={data.pCount} />
{#if data.pins}
    <div class="pins">
        {#each data.pins as entry}
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
