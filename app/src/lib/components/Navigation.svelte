<script>
    import { add, slider } from "$lib/components/Assets.svelte";
    import { search } from "$lib/scripts/stores.js";

    export let history = [];
</script>

<nav class="navigation-wrapper">
    <div class="navbar">
        {#each history as item}
            <a href="/" on:click={() => {}}>{"< back"}</a>
        {/each}
    </div>
    <h1>NHei</h1>
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
    h1 {
        font-weight: 400;
    }
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
    .toolbar span {
        display: inline-block;
        width: 4rem;
        height: 4rem;
        cursor: pointer;
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
