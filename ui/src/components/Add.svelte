<script>
    import Ok from "./icons/Ok.svelte";
    import { doujin, boards as collections } from "../scripts/stores";
    import { createEventDispatcher } from "svelte";

    export let optionalCover;
    let dispatch = createEventDispatcher();
    let sendDispatch = () => {
        dispatch("toggle");
    };

    let ref;
    let selectedBoard;
    let selectedSection;
    $: console.log(selectedBoard);
    let board = [];

    $: if ($collections.length !== 0) {
        board = $collections.map((record) => record.board);
    }
    let section = [];
    $: if (selectedBoard) {
        let board = $collections.filter(
            (record) => record.board === selectedBoard
        );
        section = board[0].sections;
    }
    let add = async () => {
        selectedSection = document.querySelector("#section").value;
        $doujin = {
            ...$doujin,
            board: selectedBoard,
            section: selectedSection,
            optionalCover,
        };
        // await fetch("http://localhost:5000/add", {
        //     method: "POST",
        //     headers: { "Content-type": "application/json" },
        //     body: JSON.stringify({
        //         doujin: $doujin,
        //     }),
        // });
        console.log($doujin);
    };
</script>

<div class="wrapper">
    <div
        class="overlay"
        class:overlay-visible={false}
        on:click={sendDispatch}
    />
    <form class="form" on:submit|preventDefault={add}>
        <img src={optionalCover} alt="optionalCover" />
        <label for="board">select board</label>
        <select bind:value={selectedBoard} name="board" id="board">
            {#each board as option}
                <option value={option}>{option}</option>
            {/each}
        </select>

        <label for="section">select section</label>
        <select
            name="section"
            id="section"
            bind:this={ref}
            on:focus={() => (ref.size = 4)}
            on:blur={() => (ref.size = 1)}
            on:change={() => (ref.size = 1)}
        >
            <option value="" />
            {#each section as option}
                <option value={option}>{option}</option>
            {/each}
        </select>

        <button class="ok" type="submit"><Ok /></button>
    </form>
</div>

<style>
    .wrapper {
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
        appearance: none;
        /* border: none; */
        outline: none;
        padding: 0.3rem;
        border-radius: 5px;
    }
    select:active,
    select:focus {
        outline: none;
        background-color: #333;
        color: white;
        margin: 0;
    }
    option {
        color: white;
        background-color: #333;
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
