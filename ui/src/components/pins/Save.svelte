<script>
    import { onMount } from "svelte";
    import Ok from "../icons/Ok.svelte";

    export let collectionName;
    let previous = collectionName;
    let ref;
    let edit = () => {};
    onMount(() => {
        ref.focus();
    });
</script>

<div class="wrapper">
    <form class="form" on:submit|preventDefault={edit}>
        <p>Enter new name</p>
        <input
            name="collection"
            type="search"
            bind:value={collectionName}
            placeholder="collection name"
            bind:this={ref}
            required
            autocomplete="off"
        />
        <button
            class="ok"
            disabled={previous === collectionName ||
                collectionName.trim() === ""}
            type="submit"><Ok /></button
        >
    </form>
</div>

<style>
    .wrapper {
        position: fixed;
    }

    .form {
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #000;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .form * {
        margin: 0.5rem 0;
    }
    input {
        width: 100%;
        border: none;
        padding: 0.5rem;
        border-radius: 5px;
    }
    input:focus {
        outline: none;
    }
    button {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
    }
    button:disabled {
        cursor: not-allowed;
    }
    button :global(svg) {
        fill: red;
    }
    button:disabled :global(svg) {
        fill: #95a5a6;
    }

    @media screen and (max-width: 600px) {
        .form {
            width: 80%;
            font-size: smaller;
        }
    }
</style>
