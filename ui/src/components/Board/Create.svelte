<script>
    import { onMount } from "svelte";
    import Ok from "../icons/Ok.svelte";

    let board = "";
    let section = "";
    let ref;
    let create = async () => {
        await fetch("http://localhost:5000/create", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                board,
                section,
            }),
        });
    };
    onMount(() => {
        ref.focus();
    });
</script>

<div class="wrapper">
    <form class="form" on:submit|preventDefault={create}>
        <p>Enter board name</p>
        <input
            name="board"
            type="search"
            bind:value={board}
            placeholder="board name"
            bind:this={ref}
            required
            autocomplete="off"
        />
        <input
            name="section"
            type="search"
            bind:value={section}
            placeholder="section name"
            autocomplete="off"
        />
        <button class="ok" disabled={board.trim() === ""} type="submit"
            ><Ok /></button
        >
    </form>
</div>

<style>
    .wrapper {
        position: fixed;
        z-index: 1;
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
