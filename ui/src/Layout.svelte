<script>
    import { onMount } from "svelte";
    import SearchBar from "./components/SearchBar.svelte";
    import MenuBar from "./components/MenuBar.svelte";
    import { getBoards, status } from "./scripts/stores";
    import Status from "./components/Status.svelte";
    import Create from "./components/Create.svelte";

    let add = false;
    let overlay = true;
    onMount(async () => {
        console.log("retrieving nhei data");
        getBoards();
    });
    const toggle = () => {
        add = !add;
        overlay = !overlay;
    };
</script>

<header>
    <div class="menu-container">
        <MenuBar on:recieve={toggle} />
        <SearchBar />
    </div>
    <h1 class="title">NHei</h1>
    {#if $status}
        <div class="status">
            <Status />
        </div>
    {/if}
    {#if add}
        <div
            class="overlay"
            class:overlay-visible={overlay}
            on:click={() => {
                overlay = !overlay;
                add = !add;
            }}
        />
        <Create on:recieve={toggle} />
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
    .overlay {
        z-index: 1;
    }
    .menu-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
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
            /* display: none; */
        }
    }
</style>
