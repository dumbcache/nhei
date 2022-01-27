<script>
    import SearchBar from "./components/SearchBar.svelte";
    import MenuBar from "./components/MenuBar.svelte";
</script>

<header>
    <div class="menu">
        <MenuBar />
        <SearchBar on:receive />
    </div>
    <h1 class="title">NHei</h1>
</header>
<main>
    <slot />
</main>

<style>
    header {
        display: grid;
        grid-template-columns: 2fr 1fr;
        background-color: #000;
        align-items: center;
        /* padding: 1rem; */
    }
    .menu {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        padding: 0.2rem;
    }
    .title {
        text-align: center;
        font-style: italic;
        color: red;
    }
    @media screen and (max-width: 600px) {
        header {
            display: block;
        }
        .menu {
            display: initial;
            position: fixed;
            bottom: 0;
            background-color: #000;
        }
    }
</style>
