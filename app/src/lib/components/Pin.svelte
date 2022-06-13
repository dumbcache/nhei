<script>
    import { empty } from "$lib/components/Assets.svelte";
    export let pin = {
        id: 373744,
        m_id: 2014946,
        fav: 6643,
        // cover: "thumb",
    };
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
                    on:error={() => {}}
                />
            {:else}
                {@html empty()}
            {/if}
        </div>
        <span>{pin.id}</span>
        <span>{pin.fav}</span>
    {/if}
</div>

<style>
    .pin {
        width: 15%;
    }
</style>
