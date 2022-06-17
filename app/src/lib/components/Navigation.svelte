<script>
    import { add, slider } from "$lib/components/Assets.svelte";
    import { search, nheiRouteHistory } from "$lib/scripts/stores.js";
    import { page } from "$app/stores";
    import Add from "$lib/components/actions/Add.svelte";

    export let bCount, sCount, pCount;
    export let title, boardName, sectionName;
    let { pathname } = $page.url;
    let routeHistory = nheiRouteHistory(pathname);
    let addHidden = true;
</script>

<nav class="navigation">
    <div class="navbar">
        {#each routeHistory as route}
            <span>{">"}</span>
            <a href={route.path} class="link" on:click={() => {}}
                ><h3>
                    {route.name}
                </h3>
            </a>
        {/each}
    </div>
    {#if title}
        <h1>{title}</h1>
    {/if}
    <input
        class="search"
        name="collection"
        type="search"
        bind:value={$search}
        placeholder="search"
        required
        autocomplete="off"
    />
    <div class="stats">
        {#if bCount}
            <p>Boards: {bCount}</p>
        {/if}
        {#if sCount}
            <p>Sections: {sCount}</p>
        {/if}{#if pCount >= 0}
            <p>Pins: {pCount}</p>
        {/if}
        <div class="toolbar">
            <span
                on:click={() => {
                    addHidden = false;
                }}>{@html add()}</span
            >
            <span on:click={() => {}}>{@html slider()}</span>
        </div>
    </div>
    <div class="add" hidden={addHidden}><Add {boardName} {sectionName} /></div>
    <div
        class="overlay"
        hidden={addHidden}
        on:click={() => {
            addHidden = true;
        }}
    />
</nav>

<style>
    .link:hover {
        color: var(--color-icon);
    }
    h3 {
        display: inline;
        padding: 0.5rem;
        font-weight: 400;
    }
    .navbar span {
        color: var(--color-icon);
    }
    .link:last-child {
        color: red;
    }
    .navigation {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        margin: 1rem 0 3rem 0;
        align-items: center;
        width: 100%;
        gap: 1rem 2rem;
    }

    .stats {
        display: flex;
        width: 60rem;
        gap: 0rem 0.5rem;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    }

    .search {
        max-width: 100%;
        background-color: var(--color-secondary);
    }

    .toolbar {
        position: relative;
    }
    .toolbar span {
        width: 4rem;
        height: 4rem;
        cursor: pointer;
    }
    .toolbar {
        display: inline-flex;
        flex-flow: row nowrap;
    }
    .add {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }
    @media screen and (max-width: 600px) {
        h3 {
            padding: 0rem;
        }

        .stats {
            font-size: 1.3rem;
            justify-content: space-between;
            width: 100%;
        }
        .toolbar span {
            width: 3rem;
            height: 3rem;
        }
        .add {
            width: 80%;
        }
    }
</style>
