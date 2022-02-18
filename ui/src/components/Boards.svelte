<script>
    import CollectionCard from "./Board/template.svelte";
    import { boards } from "../scripts/stores";
    import Navigation from "./Navigation.svelte";

    export let location, navigate;
    let data = [];
    $: if ($boards.length !== 0) {
        data = $boards.map((record) => ({
            name: record.board,
            cover: record.cover,
        }));
        console.log(data);
    }
</script>

<div class="board-wrapper">
    <Navigation boardsCount={data.length} pinsCount={200} />
    {#if data.length !== 0}
        <CollectionCard {data} type="board" />
    {:else}
        <h4>Boards</h4>
        <p class="alert">No Data Found</p>
    {/if}
</div>

<style>
    h4,
    p {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        user-select: none;
    }
    h4 {
        opacity: 0.3;
    }
    p {
        opacity: 0.5;
        top: 55%;
        font-size: x-small;
    }

    @media screen and (max-width: 600px) {
        .board-wrapper {
            margin-bottom: 150px;
        }
    }
</style>
