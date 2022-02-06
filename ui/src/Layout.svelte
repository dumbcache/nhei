<script>
    import { onMount } from "svelte";
    import SearchBar from "./components/SearchBar.svelte";
    import MenuBar from "./components/MenuBar.svelte";
    import { getBoards, boards } from "./scripts/stores";

    onMount(async () => {
        console.log("server request");
        getBoards();
    });
</script>

<header>
    <div class="menu-container">
        <MenuBar />
        <SearchBar />
    </div>
    <h1 class="title">NHei</h1>
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
