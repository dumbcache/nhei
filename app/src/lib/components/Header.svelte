<script>
    import { navAsstets, profile } from "./Assets.svelte";
</script>

<nav class="navbar">
    {#each navAsstets as entry}
        <a href={`${entry.route}`}>
            {@html entry.icon()}
        </a>
    {/each}
    <button>
        {@html profile()}
    </button>
</nav>

<style>
    .navbar {
        width: 100%;
        display: flex;
        gap: 2rem;
        flex-flow: column;
    }
    .navbar * {
        width: 5rem;
        padding: 0.5rem;
    }
    @media (max-width: 600px) {
        .navbar {
            flex-flow: row;
            justify-content: space-evenly;
        }
        .navbar * {
            width: 3rem;
            padding: 0rem;
        }
    }
</style>
