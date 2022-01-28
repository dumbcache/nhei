<script>
    import { store } from "../scripts/getDoujin";
</script>

{#if $store}
    {console.log($store)}
    {"doujin"}
{:else}
    <h4>Home</h4>
{/if}

<style>
    h4 {
        opacity: 0.1;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
