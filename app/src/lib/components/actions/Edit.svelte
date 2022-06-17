<script>
    import { ok, del, move } from "$lib/components/Assets.svelte";

    export let boardName,
        sectionName = "";
    let oldBoardName = boardName,
        oldSectionName = sectionName;
    $: disabled =
        (oldBoardName.trim() === boardName || oldBoardName.trim() === "") &&
        (oldSectionName.trim() === sectionName || oldSectionName.trim() === "");
</script>

<div class="edit">
    <form class="form" on:submit|preventDefault={() => {}}>
        <label for="board">board</label>
        <input
            type="search"
            name="board"
            id="board"
            placeholder="board"
            bind:value={oldBoardName}
            disabled={!!sectionName}
        />
        {#if sectionName}
            <label for="section">section</label>
            <input
                type="search"
                name="section"
                id="section"
                placeholder="section"
                bind:value={oldSectionName}
            />
        {/if}
        <button class="ok" type="submit" {disabled}>{@html ok}</button>
    </form>
    <span class="actions">
        <button class="move" hidden={!sectionName}>{@html move}</button>
        <button class="delete">{@html del}</button>
    </span>
</div>

<style>
    .form,
    .edit {
        display: flex;
        flex-flow: column;
        background-color: var(--color-secondary);
        padding: 4rem;
        border-radius: 1rem;
    }
    .edit {
        padding: 2rem;
        flex-flow: row;
        align-items: center;
    }
    .actions {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        gap: 1rem;
    }
    button {
        width: 4rem;
    }
    button :global(svg) {
        fill: red;
    }
    button:disabled :global(svg) {
        fill: var(--color-icon);
        cursor: not-allowed;
    }
    input {
        width: 100%;
    }

    .form :not(:last-child) {
        margin-bottom: 1rem;
    }

    @media (max-width: 600px) {
        .form {
            font-size: 1.6rem;
            padding: 2rem;
        }
        button {
            width: 3rem;
        }
    }
</style>
