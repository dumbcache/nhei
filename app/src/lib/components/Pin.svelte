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
        <span class="text">{pin.id}</span>
        <!-- <span class="text">{pin.fav}</span> -->
    {/if}
</div>

<style>
    .pin {
        width: 15%;
    }
    .text {
        font-size: 1.6rem;
    }
</style>
