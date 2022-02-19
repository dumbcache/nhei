<script>
    import {
        activeData,
        boards,
        defaultActiveData,
    } from "../scripts/stores.js";
    import Pin from "./pins/Card.svelte";
    import Navigation from "./Navigation.svelte";

    export let location, navigate;
    let path = location.pathname.split("/");
    let section = decodeURI(path.pop().trim());
    let board = decodeURI(path.pop().trim());

    $: if ($boards.length !== 0) {
        let data = $boards.filter((record) => record.board === board);
        data = data[0].sections.filter((record) => record.section === section);
        $activeData = [...data[0].pins].reverse();
        $defaultActiveData = [...data[0].pins].reverse();
        console.log("board", board);
    }
</script>

<div class="pins-wrapper">
    <Navigation pinsCount={$activeData.length} pin="pin" />
    <div class="body">
        {#if $activeData.length !== 0}
            {#each $activeData as pin (pin.id)}
                <div class="pin"><Pin {board} {section} {pin} /></div>
            {/each}
        {:else}
            <h4>Pins</h4>
            <p class="alert">No Data Found</p>
        {/if}
    </div>
</div>

<style>
    .body {
        display: flex;
        flex-flow: wrap;
        margin: 0.5rem;
    }

    .pin {
        width: 10rem;
        padding: 0.2rem;
        cursor: pointer;
    }

    h4,
    p {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
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
        .pins-wrapper {
            margin-bottom: 150px;
        }

        .pin {
            width: 33%;
        }
    }
</style>
