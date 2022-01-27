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
    @media screen and (max-width: 600px) {
    }
</style>
