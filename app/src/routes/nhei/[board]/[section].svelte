<script context="module">
    import { fetchPinsFromSection } from "$lib/scripts/stores.js";
    export async function load({ url }) {
        let parents = url.pathname.replace("/nhei/", "").split("/");
        console.log(parents);
        let data = await fetchPinsFromSection(parents);
        return {
            props: { data },
        };
    }
</script>

<script>
    import Navigation from "$lib/components/Navigation.svelte";
    import Pin from "$lib/components/Pin.svelte";

    export let data;
    console.log(data);
</script>

<Navigation />
{#if data}
    <div class="pins">
        {#each data as entry}
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
