<script>
    import Add from "../icons/Add.svelte";
    import Slider from "../icons/Slider.svelte";
    import Create from "./Create.svelte";
    let overlay = true;
    let action = "";
</script>

<div class="wrapper">
    <div class="navbar">> <button><u>collections</u></button></div>
    <div class="toolbar">
        <button
            on:click={() => {
                overlay = false;
                action = "add";
            }}><Add /></button
        >
        <button><Slider /></button>
    </div>
    <div
        class="overlay"
        class:overlay-visible={overlay}
        on:click={() => {
            overlay = true;
            action = "";
        }}
    />
    {#if action === "add"}
        <Create />
    {/if}
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
    .overlay {
        z-index: 1;
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
