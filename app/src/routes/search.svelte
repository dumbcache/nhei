<script>
    import { search } from "$lib/components/Assets.svelte";
    import Pin from "$lib/components/Pin.svelte";
    import { globalSearch } from "$lib/scripts/search.js";
    import { identity } from "svelte/internal";
    let query, data;
    const getData = async () => {
        data = await globalSearch(query);
    };
</script>

<div class="wrapper">
    <form class="form" on:submit|preventDefault={getData}>
        <input
            class="search"
            name="collection"
            type="search"
            placeholder="seach"
            bind:value={query}
            required
            autocomplete="off"
        />
        <button type="submit">
            {@html search()}
        </button>
    </form>
    <div class="pins">
        {#if data}
            {#each data as entry}
                <Pin
                    pin={{
                        id: entry.id,
                        m_id: entry.mediaId,
                        fav: entry.favorites,
                        cover: "thumb",
                    }}
                />
            {/each}
        {/if}
    </div>
</div>

<style>
    .wrapper {
        text-align: center;
    }
    .form {
        display: inline-flex;
    }
    button {
        width: 4rem;
    }
</style>
