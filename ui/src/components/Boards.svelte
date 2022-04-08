<script>
    import CollectionCard from "./Board/template.svelte";
    import { activeData, boards, defaultActiveData } from "../scripts/stores";
    import Navigation from "./Navigation.svelte";
    import { fade } from "svelte/transition";

    export let location, navigate;
    let data = [];
    let count = 0;
    $: if ($boards.length !== 0) {
        data = $boards.map((record) => ({
            name: record.board,
            cover: record.cover,
            position: record.position,
            total: record.total,
        }));
        $activeData = [...data];
        $defaultActiveData = [...data];
        console.log(data);
        count = data
            .map((record) => record.total)
            .reduce((prev, cur) => prev + cur, 0);
    }
</script>

<div class="board-wrapper" in:fade={{ duration: 200 }}>
    <Navigation boardsCount={data.length} pinsCount={count} type="board" />
    {#if data.length !== 0}
        <CollectionCard type="board" />
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
