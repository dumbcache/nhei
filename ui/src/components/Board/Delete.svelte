<script>
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { ok } from "../Icons.svelte";
    import { status, refreshStatus, getBoards } from "../../scripts/stores";

    export let name, parent, type;
    const dispatch = createEventDispatcher();

    let value;
    let disabled = true;
    $: disabled = value === name.trim() ? false : true;
    let prev = false;
    let follow = true;

    let remove = async () => {
        let response = await fetch("http://localhost:5000/delete", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                type,
                name,
                parent,
            }),
        });

        $status = await response.json();
        refreshStatus();
        getBoards();
        dispatch("recieve");
    };
</script>

<div class="wrapper" transition:fade={{ duration: 300 }}>
    <form class="form" on:submit|preventDefault={remove}>
        <div class:prev>
            <p>You sure? All pins will be deleted</p>
            <button
                type="button"
                on:click={() => {
                    prev = !prev;
                    follow = !follow;
                }}>{@html ok()}</button
            >
        </div>
        <div class:follow>
            <p>please type <b>{name}</b> to delete</p>
            <input
                type="text"
                name="name"
                placeholder={name}
                bind:value
                autocomplete="off"
            />
            <button type="submit" {disabled}>{@html ok()}</button>
        </div>
    </form>
</div>

<style>
    .wrapper {
        position: fixed;
    }

    button {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
    }
    button :global(svg) {
        fill: red;
    }
    button:disabled :global(svg) {
        fill: #95a5a6;
    }
    button:disabled {
        cursor: not-allowed;
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
    .prev,
    .follow {
        display: none;
    }
    @media screen and (max-width: 600px) {
        .form {
            width: 80%;
            font-size: smaller;
        }
        .form * {
            margin: 0.3rem;
        }
    }
</style>
