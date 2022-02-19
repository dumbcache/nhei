<script>
    import { navigate } from "svelte-navigator";
    import Add from "./icons/Add.svelte";
    import Slider from "./icons/Slider.svelte";
    import Create from "./Create.svelte";
    import Sort from "./Sort.svelte";
    import { createEventDispatcher } from "svelte";

    export let parent, pin, type;
    export let boardsCount;
    export let sectionsCount;
    export let pinsCount;
    let overlay = true;
    let action = "";
    let searchValue;
    let toggleSort = false;
    console.log(location);

    const showStatus = (e) => {
        overlay = true;
        action = "";
    };
</script>

<div class="navigation-wrapper">
    <div class="navbar">
        <button on:click={() => navigate(-1)}>{"< back"}</button>
    </div>

    <input
        class="search"
        name="collection"
        type="search"
        bind:value={searchValue}
        placeholder="search"
        required
        autocomplete="off"
    />
    <div class="stats">
        {#if boardsCount}
            <p>Boards : {boardsCount}</p>
        {/if}
        {#if sectionsCount}
            <p>Sections : {sectionsCount}</p>
        {/if}{#if pinsCount >= 0}
            <p>Pins : {pinsCount}</p>
        {/if}
        <div class="toolbar">
            {#if !pin}
                <button
                    on:click={() => {
                        overlay = false;
                        action = "add";
                    }}><Add /></button
                >
            {/if}
            <button on:click={() => (toggleSort = !toggleSort)}
                ><Slider /></button
            >
            {#if toggleSort}
                <div class="sort">
                    <Sort {type} />
                </div>
            {/if}
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
        <Create on:recieve={showStatus} {parent} />
    {/if}
</div>

<style>
    .navigation-wrapper {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 0 1rem;
        margin: 1rem 0;
        align-items: center;
        width: 100%;
    }
    .navigation-wrapper > * {
        margin: 0.2rem 0;
    }

    .navigation-wrapper button :global(svg) {
        width: 40px;
    }

    .navigation-wrapper button {
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
    .search {
        max-width: 100%;
        border: none;
        padding: 0.3rem;
        border-radius: 5px;
    }
    .search:focus {
        outline: none;
    }
    .toolbar {
        position: relative;
    }
    .sort {
        position: absolute;
        right: 0px;
        font-size: smaller;
        z-index: 1;
    }
    @media screen and (max-width: 600px) {
        p {
            font-size: small;
        }
        .navigation-wrapper button :global(svg) {
            width: 30px;
        }
        .navigation-wrapper button {
            height: 30px;
            font-size: medium;
        }
        .stats {
            justify-content: space-between;
            width: 100%;
        }
    }
</style>
