<script>
    import { empty } from "$lib/components/Assets.svelte";
    export let card;
</script>

{#if card}
    <div class="pin-wrapper">
        <div class="cover">
            {#if Boolean(card.cover) == true}
                <img
                    src={card.cover}
                    alt={card.name}
                    referrerpolicy="no-referrer"
                    on:error={() => {}}
                />
            {:else}
                {@html empty()}
            {/if}
        </div>

        <span>{card.name}</span>
        {#if card.sCount}
            <span>{card.sCount}</span>
        {/if}
        {#if card.pCount}
            <span>{card.pCount}</span>
        {/if}
    </div>
{/if}

<style>
    .wrapper {
        display: flex;
        flex-flow: column;
    }
    img {
        height: 100px;
        width: 100%;
        object-fit: cover;
    }
</style>
