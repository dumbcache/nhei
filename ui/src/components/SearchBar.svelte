<script>
    import { createEventDispatcher } from "svelte";
    import Search from "./icons/Search.svelte";

    const dispatch = createEventDispatcher();
    let input = "";
    $: disabled = input.trim().length === 0;
    function sendDispatch() {
        dispatch("receive", {
            input: input,
        });
    }
</script>

<form on:submit|preventDefault={sendDispatch}>
    <div class="search-container">
        <input
            class="search"
            type="search"
            placeholder="enter id"
            bind:value={input}
        />
        <button class="search-button" {disabled} type="submit"
            ><Search /></button
        >
    </div>
</form>

<style>
    .search-container {
        display: grid;
        grid-template-columns: 90% 10%;
        width: 100%;
        padding: 0.2rem;
    }
    .search {
        border: none;
        padding: 0.5rem;
        border-radius: 5px;
    }
    .search:focus {
        outline: none;
    }
    .search-button {
        border-radius: 5px;
        background-color: #f00;
    }
    .search-button:disabled {
        background-color: #555;
    }
    .search-button:active {
        background-color: #999;
    }

    @media screen and (max-width: 600px) {
    }
</style>
