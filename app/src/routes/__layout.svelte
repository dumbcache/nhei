<script>
    import "../app.css";
    import Header from "$lib/components/Header.svelte";
    import { overlay } from "$lib/scripts/stores.js";
</script>

<div class="body">
    <header class="header">
        <Header />
    </header>
    <main class="main">
        <slot />

        <div
            class="overlay"
            class:overlay-active={$overlay}
            on:click={() => {
                $overlay = false;
            }}
        />
    </main>
</div>

<style>
    .body {
        display: flex;
        height: 100%;
    }
    .header {
        display: grid;
        place-content: center;
        width: 10%;
        background-color: var(--color-header);
    }
    .main {
        width: 90%;
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
        padding: 1rem 2rem;
    }

    @media (max-width: 600px) {
        .body {
            flex-flow: column;
        }
        .header {
            position: fixed;
            bottom: 0rem;
            height: 10%;
            width: 100%;
        }
        .main {
            width: 100%;
            height: 90%;
            padding: 1rem;
        }
    }
</style>
