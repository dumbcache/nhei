<script>
    import { search } from "$lib/components/Assets.svelte";
    import Pin from "$lib/components/Pin.svelte";
    import Doujin from "$lib/components/Doujin.svelte";
    import { globalSearch } from "$lib/scripts/search.js";
    import { onMount } from "svelte";

    //366224,304307
    let query = 304307,
        data,
        doujin,
        searchField;
    const getData = async () => {
        data = await globalSearch(query);
    };
    onMount(() => {
        searchField.focus();
    });
</script>

<div class="wrapper">
    <form class="form" on:submit|preventDefault={getData}>
        <input
            class="search"
            name="collection"
            type="search"
            placeholder="seach"
            bind:value={query}
            bind:this={searchField}
            required
            autocomplete="off"
        />
        <!-- <button type="submit">
            {@html search()}
        </button> -->
    </form>
    {#if data}
        <div class="pins">
            {#each data as entry}
                <div
                    class="pin-wrapper"
                    on:click={() => {
                        doujin = entry;
                    }}
                >
                    <Pin
                        pin={{
                            m_id: entry.mediaId,
                            cover: "thumb",
                        }}
                    />
                </div>
            {/each}
        </div>
    {/if}
    {#if doujin}
        <Doujin {doujin} />
    {/if}
</div>

<style>
    .wrapper {
        text-align: center;
    }
    .wrapper :not(:last-child) {
        margin-bottom: 4rem;
    }
    .form {
        display: inline-flex;
    }
    .pin-wrapper {
        cursor: pointer;
    }
    .search {
        width: 100%;
    }
    button {
        width: 4rem;
        height: 4rem;
    }
    @media (max-width: 600px) {
        .wrapper :not(:last-child) {
            margin-bottom: 2rem;
        }
    }
</style>
