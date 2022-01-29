<script>
    import { collections } from "../scripts/stores";
    import CollectionCard from "./CollectionCard.svelte";

    console.log($collections);
</script>

<div>
    <h4>Collections</h4>
    {#if $collections}
        <div class="collections">
            {#each $collections as item}
                <div class={item.name}>
                    {#if !item.count}
                        <CollectionCard name={item.name} />
                    {/if}
                </div>
            {/each}
        </div>
    {:else}
        <p>No Data Found</p>
    {/if}
</div>

<style>
    h4,
    p {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    h4 {
        opacity: 0.1;
    }
    p {
        opacity: 0.5;
        top: 55%;
        font-size: x-small;
    }
    .collections {
        display: flex;
        flex-flow: row wrap;
    }
</style>
