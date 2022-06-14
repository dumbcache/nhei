<script>
    import { add, slider } from "$lib/components/Assets.svelte";
    import { search } from "$lib/scripts/stores.js";
    import { page } from "$app/stores";
    // console.log($page.url);
    let routeHistory = (() => {
        let { pathname } = $page.url;
        console.log(pathname);
        let arr = pathname.replaceAll("/", " ").trim().split(" ");
        console.log(arr);
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let slice = arr.slice(0, i + 1);
            console.log(`/${slice.join("/")}`);
            result.push({ path: `/${slice.join("/")}`, name: arr[i] });
        }
        console.log(result);
        return result;
    })();
    export let title;
</script>

<nav class="navigation-wrapper">
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
        <!-- {#if boardsCount} -->
        <p>Boards</p>
        <!-- {/if} -->
        <!-- {#if sectionsCount} -->
        <!-- <p>Sections</p> -->
        <!-- {/if}{#if pinsCount >= 0} -->
        <!-- <p>Pins</p> -->
        <!-- {/if} -->
        <div class="toolbar">
            <span on:click={() => {}}>{@html add()}</span>
            <span on:click={() => {}}>{@html slider()}</span>
        </div>
    </div>
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
    .navigation-wrapper {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 0 1rem;
        margin: 1rem 0 3rem 0;
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
        background-color: var(--color-secondary);
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
    .toolbar span {
        display: inline-block;
        width: 4rem;
        height: 4rem;
        cursor: pointer;
    }
    @media screen and (max-width: 600px) {
        h3 {
            padding: 0rem;
        }
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
