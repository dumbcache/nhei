<script>
    import { ok, del, copy, move } from "$lib/components/Assets.svelte";

    export let m_id, cover;
    let action;
    let old_m_id = m_id,
        oldCover = cover;
    $: disabled =
        old_m_id.trim() === m_id ||
        old_m_id.trim() === "" ||
        oldCover.trim() === cover ||
        oldCover.trim() === "";
</script>

<div class="edit">
    <form class="form" on:submit|preventDefault={() => {}}>
        <label for="m_id">media_id</label>
        <input
            type="text"
            name="m_id"
            id="m_id"
            placeholder="media id"
            bind:value={old_m_id}
        />
        <label for="cover">cover</label>
        <input
            type="text"
            name="cover"
            id="cover"
            placeholder="enter any number"
            bind:value={oldCover}
        />

        <button class="ok" type="submit" {disabled}>{@html ok}</button>
    </form>
    <span class="actions">
        <button class="copy">{@html copy}</button>
        <button class="move">{@html move}</button>
        <button class="delete">{@html del}</button>
    </span>
</div>

<style>
    .form,
    .edit {
        display: flex;
        flex-flow: column;
        background-color: var(--color-secondary);
        padding: 2rem;
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
            padding: 2rem;
        }
        button {
            width: 3rem;
        }
    }
</style>
