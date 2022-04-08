<script>
    import { ok } from "./Icons.svelte";
    import { fade } from "svelte/transition";
    import {
        doujin,
        boards as collections,
        status,
        refreshStatus,
        doujinPresent,
    } from "../scripts/stores";
    import { createEventDispatcher } from "svelte";

    export let optionalCover;
    let dispatch = createEventDispatcher();
    let sendDispatch = () => {
        dispatch("toggle");
    };

    let ref1, ref2;
    let selectedBoard;
    let selectedSection;
    $: console.log(selectedBoard);
    let board = [];
    $: disabled = board.length === 0;
    $: if ($collections.length !== 0) {
        board = $collections.map((record) => record.board);
    }
    let section = [];
    $: if (selectedBoard) {
        let board = $collections.filter(
            (record) => record.board === selectedBoard
        );
        section = board[0].sections.map((record) => record.section);
    }
    let add = async () => {
        selectedSection = document.querySelector("#section").value;
        let addData = {
            board: selectedBoard,
            section: selectedSection,
            cover: optionalCover,
            favourites: $doujin.favourites,
        };
        sendDispatch();
        let response = await fetch("http://localhost:5000/add", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                id: $doujin.id,
                doujin: $doujin,
                addData,
            }),
        });
        $status = await response.json();
        refreshStatus();
        $doujinPresent = true;
        console.log($status);
    };
</script>

<div class="add-wrapper" transition:fade={{ duration: 300 }}>
    <div
        class="overlay"
        class:overlay-visible={false}
        on:click={sendDispatch}
    />
    <form class="form" on:submit|preventDefault={add}>
        <img src={optionalCover} alt="optionalCover" />
        <label for="board">select board</label>
        <select
            bind:value={selectedBoard}
            name="board"
            id="board"
            bind:this={ref1}
            on:focus={() =>
                (ref1.size = section.length > 3 ? 3 : section.length - 1)}
            on:blur={() => (ref1.size = 1)}
            on:change={() => (ref1.size = 1)}
            {disabled}
        >
            {#each board as option}
                <option value={option}>{option}</option>
            {/each}
        </select>

        <label for="section">select section</label>
        <select
            name="section"
            id="section"
            bind:this={ref2}
            on:focus={() =>
                (ref2.size = section.length > 4 ? 4 : section.length - 1)}
            on:blur={() => (ref2.size = 1)}
            on:change={() => (ref2.size = 1)}
            {disabled}
        >
            <option value="" />
            {#each section as option}
                <option value={option}>{option}</option>
            {/each}
        </select>

        <button class="ok" type="submit" {disabled}>{@html ok()}</button>
    </form>
</div>

<style>
    .add-wrapper {
        position: fixed;
        z-index: 1;
    }

    img {
        height: 200px;
        object-fit: contain;
    }
    .form {
        display: flex;
        flex-flow: column;
        width: 40%;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #000;
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -40%);
    }
    .form * {
        margin: 0.2rem;
    }
    select {
        outline: none;
        padding: 0.3rem;
        border-radius: 5px;
        color: white;
        background-color: #333;
    }
    select:active,
    select:focus {
        outline: none;
        padding: 0.3rem;
        border-radius: 5px;
    }
    select:disabled {
        appearance: none;
        background-color: #111;
    }
    option {
        font-size: smaller;
        border: none;
        padding: 0.3rem;
        border-radius: 5px;
        margin: 0;
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
            width: 70%;
            font-size: smaller;
        }
    }
</style>
