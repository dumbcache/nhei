<script>
    import { boards } from "$lib/scripts/stores.js";
    import Card from "$lib/components/Card.svelte";
</script>

<svelte:head>
    <title>dCache . nhei</title>
</svelte:head>

<div>layout</div>

{#if Boolean($boards.boards) != false}
    {#each $boards.boards as card}
        <Card {card} />
    {/each}
{/if}

<style>
</style>
