<script>
    import Section from "./Board/template.svelte";
    import { boards } from "../scripts/stores";
    import Navigation from "./Navigation.svelte";
    import Pin from "./pins/Card.svelte";

    export let location, navigate;
    let board = decodeURI(location.pathname.split("/").pop().trim());
    let parent = board;
    let data = [];
    let pins = [];
    $: if ($boards.length !== 0) {
        board = $boards.filter((record) => record.board === board);
        data = board[0].sections.map((record) => record.section);
        pins = board[0].pins;
        console.log(pins);
    }
</script>

<div class="section-wrapper">
    <Navigation sectionsCount={data.length} pinsCount={pins.length} {parent} />
    {#if data.length !== 0 || pins.length !== 0}
        <Section {data} type="section" {parent}>
            {#if pins.length !== 0}
                <div class="pins">
                    {#each pins as pin}
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
