<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    import { getBoards, refreshStatus, status } from "../../scripts/stores";
    import { ok } from "../Icons.svelte";
    export let id, section, board;

    let dispatch = createEventDispatcher();
    const action = async () => {
        let response = await fetch("http://localhost:5000/delete", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, section, board }),
        });
        dispatch("recieve");
        $status = await response.json();
        refreshStatus();
        getBoards();
    };
</script>

<div class="wrapper" transition:fade={{ duration: 300 }}>
    <div>
        <p>You sure?</p>
        <button on:click={action}>{@html ok()}</button>
    </div>
</div>

<style>
    .wrapper {
        position: fixed;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #000;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
    button {
        width: 40px;
    }
    button :global(svg) {
        fill: red;
    }
    button:disabled :global(svg) {
        fill: #95a5a6;
    }

    @media screen and (max-width: 600px) {
    }
</style>
