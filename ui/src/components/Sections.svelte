<script>
    import Section from "./Board/template.svelte";
    import {
        activeData,
        boards,
        defaultActiveData,
        activePinData,
        defaultActivePinData,
    } from "../scripts/stores";
    import Navigation from "./Navigation.svelte";
    import Pin from "./pins/Card.svelte";

    export let location, navigate;
    let parent = decodeURI(location.pathname.split("/").pop().trim());

    let data = [];
    let pins = [];

    $: if ($boards.length !== 0) {
        console.log("board", parent);
        let dirr = $boards;
        let board = $boards.filter((record) => record.board === parent);
        console.log(dirr);
        data = board[0].sections.map((record) => ({
            name: record.section,
            cover: record.cover,
            position: record.position,
            total: record.total,
        }));
        pins = board[0].pins;
        $activeData = [...data];
        $defaultActiveData = [...data];
        $activePinData = [...pins].reverse();
        $defaultActivePinData = [...pins].reverse();
    }
</script>

<div class="section-wrapper">
    <Navigation
        sectionsCount={data.length}
        pinsCount={pins.length}
        {parent}
        type="section"
    />
    {#if data.length !== 0 || pins.length !== 0}
        <Section {$activeData} type="section" {parent}>
            {#if $activePinData.length !== 0}
                <div class="pins">
                    {#each $activePinData as pin}
                        <div class="pin"><Pin {pin} board={parent} /></div>
                    {/each}
                </div>
            {/if}
        </Section>
    {:else}
        <h4>sections</h4>
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
    }
    h4 {
        opacity: 0.3;
    }
    p {
        opacity: 0.5;
        top: 55%;
        font-size: x-small;
    }
    .pins {
        display: flex;
        flex-flow: wrap;
        margin: 0.5rem;
        justify-content: center;
    }
    .pin {
        width: 10rem;
        padding: 0.2rem;
    }
    @media screen and (max-width: 600px) {
        .section-wrapper {
            margin-bottom: 150px;
        }
        .pin {
            width: 33%;
        }
    }
</style>
