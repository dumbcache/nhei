<script>
    import { empty, edit, del } from "$lib/components/Assets.svelte";
    export let card, pathname;
</script>

{#if card}
    <div class="card">
        <a href={`${pathname}/${card.name}`}>
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
            <span class="title">{card.name}</span>
            <div class="data">
                {#if card.sCount}
                    <p>
                        <span>sections:</span>
                        <span>{card.sCount}</span>
                    </p>
                {/if}
                {#if card.pCount}
                    <p>
                        <span>pins:</span>
                        <span>{card.pCount}</span>
                    </p>
                {/if}
            </div>
        </a>
        <div class="actions">
            <button
                on:click={(e) => {
                    e.stopPropagation();
                }}>{@html edit()}</button
            >
            <button on:click={(e) => {}}>{@html del()}</button>
        </div>
    </div>
{/if}

<style>
    .card {
        position: relative;
        height: 100%;
        display: flex;
        flex-flow: column;
        gap: 0.5rem;
        text-align: center;
    }
    .cover {
        height: 75%;
        /* border-radius: 1rem;
        overflow: hidden; */
    }
    .title {
        color: aquamarine;
        font-size: 1.6rem;
    }
    .data {
        display: flex;
        justify-content: space-evenly;
    }
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .cover:global(svg) {
        fill: red;
    }
    .actions {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
    }
    .actions button {
        width: 2.4rem;
        display: block;
        margin-bottom: 0.5rem;
    }
    @media (max-width: 600px) {
        .card {
            gap: 0rem;
        }
    }
</style>
