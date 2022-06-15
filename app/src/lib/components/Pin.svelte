<script>
    import { empty } from "$lib/components/Assets.svelte";
    export let pin;
    let url = isNaN(Number(pin.cover)) ? "t" : "i";
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
    {/if}
</div>

<style>
    .text {
        font-size: 1.6rem;
    }
    @media (max-width: 600px) {
    }
</style>
