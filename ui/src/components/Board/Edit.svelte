<script>
    import { onMount } from "svelte";
    import Ok from "../icons/Ok.svelte";

    export let name;
    export let type;
    let previous = name;
    let ref;
    let edit = async () => {
        await fetch("http://localhost:5000/create", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                type,
                name,
            }),
        });
    };
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
            bind:value={name}
            placeholder="collection name"
            bind:this={ref}
            required
            autocomplete="off"
        />
        <button
            class="ok"
            disabled={previous === name || name.trim() === ""}
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
