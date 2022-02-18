<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const sendDispatch = (type) => {
        dispatch("sort", {
            type,
        });
    };
    const types = ["default", "old", "favourites", "id"];
</script>

<div class="sort-wrapper">
    {#each types as type}
        <div on:click={() => sendDispatch(type)}>{type}</div>
    {/each}
</div>

<style>
    .sort-wrapper {
        width: max-content;
        background-color: #666;
        /* color: black; */
        box-shadow: 0px 0px 10px black;
    }
    .sort-wrapper div {
        padding: 0.2rem;
    }
    .sort-wrapper div:hover {
        cursor: pointer;
        background-color: #222;
    }
</style>
