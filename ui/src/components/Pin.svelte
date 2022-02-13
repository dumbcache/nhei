<script>
    import { boards } from "../scripts/stores.js";
    import Pin from "./pins/Card.svelte";
    import Navigation from "./Navigation.svelte";

    export let location, navigate;
    let path = location.pathname.split("/");
    let section = path.pop().trim();
    let board = path.pop().trim();
    let pins = [];

    $: if ($boards.length !== 0) {
        board = $boards.filter((record) => record.board === board);
        let data = board[0].sections.filter(
            (record) => record.section === section
        );
        pins = data[0].pins;
        console.log(pins);
    }
</script>

<div class="pins-wrapper">
    <Navigation pinsCount={200} />
    <div class="body">
        {#if pins.length !== 0}
            {#each pins as pin (pin.id)}
                <div class="pin"><Pin {pin} /></div>
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
