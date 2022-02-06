<script>
    import { sections } from "../scripts/stores";
    import Board from "./Board/Card.svelte";

    export let location, navigate;
</script>

<div class="wrapper">
    {#if $sections}
        <Board type="section" />
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

    @media screen and (max-width: 600px) {
        .wrapper {
            margin-bottom: 150px;
        }
    }
</style>
