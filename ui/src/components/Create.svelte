<script>
    import { onMount, createEventDispatcher } from "svelte";
    import { refreshStatus, status } from "../scripts/stores";
    import Ok from "./icons/Ok.svelte";

    let board = "";
    let section = "";
    let ref;
    let dispatch = createEventDispatcher();
    let create = async () => {
        console.log("sent");
        let response = await fetch("http://localhost:5000/create", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                board,
                section,
            }),
        });
        $status = await response.json();
        refreshStatus();
        dispatch("recieve");
        // console.log(await response.json());
    };
    onMount(() => {
        ref.focus();
    });
</script>

<div class="wrapper">
    <form class="form" on:submit|preventDefault={create}>
        <p>Board name</p>
        <input
            name="board"
            type="search"
            bind:value={board}
            placeholder="board"
            bind:this={ref}
            required
            autocomplete="off"
        />
        <p>Section name</p>
        <input
            name="section"
            type="search"
            bind:value={section}
            placeholder="section"
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
    .form p {
        margin: 0;
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
