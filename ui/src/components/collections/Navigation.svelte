<script>
    import Add from "../icons/Add.svelte";
    import Slider from "../icons/Slider.svelte";
</script>

<div class="wrapper">
    <div class="navbar">> <button><u>collections</u></button></div>
    <div class="toolbar">
        <button><Add /></button>
        <button><Slider /></button>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: space-between;
        padding: 0 2rem;
        margin: 1rem 0;
        align-items: center;
    }

    .wrapper button :global(svg) {
        width: 40px;
    }

    .wrapper button {
        font-size: large;
        height: 40px;
    }
    @media screen and (max-width: 600px) {
        .wrapper div {
            font-size: 20px;
        }
        .wrapper button :global(svg) {
            width: 30px;
        }
        .wrapper button {
            height: 30px;
        }
    }
</style>
