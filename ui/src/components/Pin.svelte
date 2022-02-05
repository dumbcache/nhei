<script>
    import { pins } from "../scripts/stores.js";
    import Pin from "./pins/Card.svelte";
</script>

<div class="wrapper">
    {#each $pins as pin (pin.id)}
        <Pin details={pin} />
    {/each}
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
    @media screen and (max-width: 600px) {
        .wrapper {
            margin-bottom: 150px;
        }
        .wrapper > :global(.wrapper) {
            width: 44%;
            background-color: #555;
        }
    }
</style>
