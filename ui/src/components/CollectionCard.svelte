<script>
    import Empty from "./icons/Empty.svelte";

    export let name;
</script>

<div class="collection-card">
    <Empty />
    <h4>{name}</h4>
</div>

<style>
    .collection-card {
        width: 280px;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .collection-card :global(svg) {
        width: 100%;
    }
    .collection-card:hover {
        cursor: pointer;
    }
    h4 {
        font-weight: 500;
    }

    @media screen and (max-width: 600px) {
        .collection-card {
            width: 45vw;
        }
    }
</style>
