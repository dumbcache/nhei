<script>
    import { empty } from "$lib/components/Assets.svelte";
    export let card;
</script>

<div class="card">
    {#if card}
        <a href={`nhei/${card.name}`}>
            <div class="thumb">
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
        </a>
    {/if}
</div>

<style>
    .card {
        width: 90px;
    }
</style>
