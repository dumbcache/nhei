<script>
    import SearchBar from "./components/SearchBar.svelte";
    import MenuBar from "./components/MenuBar.svelte";
</script>

<header>
    <div class="menu">
        <MenuBar />
        <SearchBar on:receive />
    </div>
    <h1 class="title">NHei Personal</h1>
</header>
<main>
    <slot />
</main>

<style>
    @media screen and (max-width: 600px) {
    }
</style>
