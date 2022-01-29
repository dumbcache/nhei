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
        width: 25vw;
    }
    .collection-card :global(svg) {
        width: 100%;
    }
    .collection-card:hover {
        cursor: pointer;
    }
    h4 {
        margin: 0;
    }
    @media screen and (max-size: 600px) {
        .collection-card {
            width: 50vw;
        }
    }
</style>
