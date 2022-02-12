<script>
    import { onMount } from "svelte";
    import SearchBar from "./components/SearchBar.svelte";
    import MenuBar from "./components/MenuBar.svelte";
    import { getBoards, status } from "./scripts/stores";
    import Status from "./components/Status.svelte";

    onMount(async () => {
        console.log("retrieving nhei data");
        getBoards();
    });
</script>

<header>
    <div class="menu-container">
        <MenuBar />
        <SearchBar />
    </div>
    <h1 class="title">NHei</h1>
    {#if $status}
        <div class="status">
            <Status />
        </div>
    {/if}
</header>
<main>
    <slot />
</main>

<style>
    header {
        display: grid;
        grid-template-columns: auto 1fr;
        background-color: #000;
        align-items: center;
    }
    .menu-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        width: 100%;
        padding: 0.2rem;
    }
    .title {
        text-align: center;
        font-style: italic;
        color: red;
        padding: 0rem 0.5rem;
    }
    .status {
        z-index: 5;
        position: fixed;
        top: 10%;
        left: 50%;
        transform: translate(-50%, 0);
        box-shadow: 5px 5px 50px #000;
    }
    @media screen and (max-width: 600px) {
        header {
            display: block;
        }
        .menu-container {
            display: initial;
            position: fixed;
            bottom: 0;
            background-color: #000;
            z-index: 2;
        }
        .title {
            display: none;
        }
    }
</style>
