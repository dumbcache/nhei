<script>
    import { navigate } from "svelte-navigator";
    import Add from "./icons/Add.svelte";
    import Slider from "./icons/Slider.svelte";
    import Create from "./Board/Create.svelte";

    let overlay = true;
    let action = "";
    let searchValue;
    export let boardsCount;
    export let sectionsCount;
    export let pinsCount;
    console.log(location);

    const showStatus = (e) => {
        overlay = true;
        action = "";
    };
</script>

<div class="wrapper">
    <div class="navbar">
        <button on:click={() => navigate(-1)}>{"< back"}</button>
    </div>

    <input
        class="search"
        name="collection"
        type="search"
        bind:value={searchValue}
        placeholder="collection name"
        required
        autocomplete="off"
    />
    <div class="stats">
        {#if boardsCount}
            <p>Boards : {boardsCount}</p>
        {/if}
        {#if sectionsCount}
            <p>Sections : {sectionsCount}</p>
        {/if}{#if pinsCount}
            <p>Pins : {pinsCount}</p>
        {/if}
        <div class="toolbar">
            <button
                on:click={() => {
                    overlay = false;
                    action = "add";
                }}><Add /></button
            >
            <button><Slider /></button>
        </div>
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
        <Create on:recieve={showStatus} />
    {/if}
</div>

<style>
    .wrapper {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 0 1rem;
        margin: 1rem 0;
        align-items: center;
        width: 100%;
    }
    .wrapper > * {
        margin: 0.2rem 0;
    }

    .wrapper button :global(svg) {
        width: 40px;
    }

    .wrapper button {
        font-size: large;
        height: 30px;
    }
    .stats {
        display: flex;
        width: 600px;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    }

    .overlay {
        z-index: 1;
    }
    input {
        max-width: 100%;
        border: none;
        padding: 0.3rem;
        border-radius: 5px;
    }
    input:focus {
        outline: none;
    }
    @media screen and (max-width: 600px) {
        p {
            font-size: small;
        }
        .wrapper button :global(svg) {
            width: 30px;
        }
        .wrapper button {
            height: 30px;
            font-size: medium;
        }
        .stats {
            justify-content: space-between;
            width: 100%;
        }
    }
</style>
