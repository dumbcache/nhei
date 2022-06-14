<script>
    import { ok } from "$lib/components/Assets.svelte";
    import { fade } from "svelte/transition";

    let board = "",
        section;
    $: disabled = !Boolean(board.trim());
    $: console.log(disabled);
</script>

<div class="add" transition:fade={{ duration: 200 }}>
    <form class="form" on:submit|preventDefault={() => {}}>
        <label for="board">board</label>
        <input
            type="search"
            name="board"
            id="board"
            placeholder="board"
            bind:value={board}
        />

        <label for="section">section</label>
        <input
            type="search"
            name="section"
            id="section"
            placeholder="section"
            bind:value={section}
            {disabled}
        />

        <button class="ok" type="submit" {disabled}>{@html ok}</button>
    </form>
</div>

<style>
    .add {
        display: grid;
        place-content: center;
        height: 100%;
    }
    .form {
        margin: auto;
        display: flex;
        flex-flow: column;
        background-color: var(--color-secondary);
        padding: 4rem;
        border-radius: 1rem;
    }
    .ok {
        width: 40px;
    }
    button :global(svg) {
        fill: red;
    }
    button:disabled :global(svg) {
        fill: var(--color-icon);
    }
    input {
        width: 100%;
    }
    button {
        background: none;
        color: inherit;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .form :not(:last-child) {
        margin-bottom: 1rem;
    }

    @media (max-width: 600px) {
        .form {
            padding: 2rem;
            width: 90%;
        }
    }
</style>
