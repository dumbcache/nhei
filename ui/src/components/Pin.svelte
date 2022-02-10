<script>
    import { pins } from "../scripts/stores.js";
    import Pin from "./pins/Card.svelte";
</script>

<div class="wrapper">
    {#if $pins.length !== 0}
        {#each $pins as pin (pin.id)}
            <Pin details={pin} />
        {/each}
    {:else}
        <h4>Pins</h4>
        <p class="alert">No Data Found</p>
    {/if}
</div>

<style>
    .wrapper {
        display: flex;
        flex-flow: wrap;
        padding: 0 0.5rem;
    }
    .wrapper > :global(.wrapper) {
        width: 200px;
        background-color: #555;
        margin: 0.5rem;
    }
    .wrapper :global(.wrapper > svg) {
        width: 100%;
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
        .wrapper {
            margin-bottom: 150px;
        }
        .wrapper > :global(.wrapper) {
            width: 42%;
            background-color: #555;
        }
    }
</style>
