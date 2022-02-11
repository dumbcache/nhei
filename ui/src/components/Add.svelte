<script>
    import Ok from "./icons/Ok.svelte";
    import { doujin, boards as collections } from "../scripts/stores";

    let selectedBoard;
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
        console.log(board);
        section = board[0].sections;
    }
    $: console.log(board, section);
    let add = async () => {
        $doujin = { ...$doujin, selectedBoard, selectedSection };
        await fetch("http://localhost:5000/add", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                doujin: $doujin,
            }),
        });
    };

    export let collectionName;
    let previous = collectionName;
    let ref;
</script>

<div class="wrapper">
    <form class="form" on:submit|preventDefault={add}>
        <label for="board">select board</label>
        <select bind:value={selectedBoard} name="board" id="board">
            {#each board as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
        <label for="section">select section</label>
        <select name="section" id="section">
            {#each section as option}
                <option value={option}>{option}</option>
            {/each}
        </select>

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
