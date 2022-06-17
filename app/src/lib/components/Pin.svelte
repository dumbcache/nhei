<script>
    import { empty, edit } from "$lib/components/Assets.svelte";
    import PinEdit from "$lib/components/actions/PinEdit.svelte";
    export let pin;
    let url = isNaN(Number(pin.cover)) ? "t" : "i";
    let editHidden = true;
</script>

<div class="pin">
    {#if pin}
        <div class="cover">
            {#if pin.cover}
                <img
                    src={`https://${url}.nhentai.net/galleries/${pin.m_id}/${pin.cover}.jpg`}
                    alt={pin.id}
                    referrerpolicy="no-referrer"
                    on:error={(e) => {
                        e.target.src = `https://${url}.nhentai.net/galleries/${pin.m_id}/${pin.cover}.png`;
                    }}
                />
            {:else}
                {@html empty()}
            {/if}
        </div>
        {#if pin.id}
            <span class="text">{pin.id}</span>
        {/if}
        {#if pin.fav}
            <span class="text">{pin.fav}</span>
        {/if}
        <div class="actions">
            <button
                on:click={() => {
                    editHidden = false;
                }}>{@html edit()}</button
            >
        </div>
    {/if}
</div>

<div class="edit" hidden={editHidden}><PinEdit /></div>
<div
    class="overlay"
    hidden={editHidden}
    on:click={() => {
        editHidden = true;
    }}
/>

<style>
    .pin {
        position: relative;
    }
    .text {
        font-size: 1.6rem;
    }
    .actions {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        background-color: var(--color-secondary);
        width: 2.5rem;
        border-radius: 50%;
    }
    .actions button {
        width: 2rem;
        transform: translate(10%, 20%);
    }
    .edit {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }
    @media (max-width: 600px) {
        .edit {
            width: 80%;
        }
    }
</style>
