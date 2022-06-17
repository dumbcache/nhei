<script>
    import { empty, edit } from "$lib/components/Assets.svelte";
    import Edit from "$lib/components/actions/Edit.svelte";
    export let card, pathname, boardName, sectionName;
    let editHidden = true;
</script>

{#if card}
    <div class="card">
        <div class="cover">
            <a href={`${pathname}/${card.name}`}>
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
            </a>
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
        <div class="actions">
            <button
                on:click={() => {
                    editHidden = false;
                }}>{@html edit()}</button
            >
        </div>
    </div>
{/if}
<div class="edit" hidden={editHidden}><Edit {boardName} {sectionName} /></div>
<div
    class="overlay"
    hidden={editHidden}
    on:click={() => {
        editHidden = true;
    }}
/>

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
        background-color: var(--color-secondary);
        width: 3rem;
        border-radius: 50%;
    }
    .actions button {
        width: 2.4rem;
        transform: translateY(10%);
    }
    .edit {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }
    @media (max-width: 600px) {
        .card {
            gap: 0rem;
        }
        .edit {
            width: 80%;
        }
    }
</style>
