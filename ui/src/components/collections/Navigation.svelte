<script>
    import Add from "../icons/Add.svelte";
    import Slider from "../icons/Slider.svelte";
</script>

<div class="navigation">
    <div class="navbar">> <button><u>collections</u></button></div>
    <div class="toolbar">
        <button><Add /></button>
        <button><Slider /></button>
    </div>
</div>

<style>
    .navigation {
        display: flex;
        justify-content: space-between;
        padding: 0 2rem;
        margin: 1rem 0;
        align-items: center;
    }

    .navigation button :global(svg) {
        width: 40px;
    }

    .navigation button {
        font-size: large;
        height: 40px;
    }
    @media screen and (max-width: 600px) {
        .navigation div {
            font-size: 20px;
        }
        .navigation button :global(svg) {
            width: 30px;
        }
        .navigation button {
            height: 30px;
        }
    }
</style>
