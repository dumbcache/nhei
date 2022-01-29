<script>
    import { collections } from "../scripts/stores";
    import CollectionCard from "./CollectionCard.svelte";
    import Add from "./icons/Add.svelte";
    import Slider from "./icons/Slider.svelte";

    console.log($collections);
</script>

<div>
    <div class="navigation">
        <div>> <button><u>collections</u></button></div>
        <div>
            <button on:click={() => console.log("hell")}><Add /></button>
            <button on:click={() => console.log("hell")}><Slider /></button>
        </div>
    </div>
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
        <h4>Collections</h4>
        <p class="">No Data Found</p>
    {/if}
</div>

<style>
    .navigation {
        display: flex;
        justify-content: space-between;
        padding: 0 2rem;
        margin: 1rem 0;
    }
    .navigation button :global(svg) {
        width: 40px;
    }

    .navigation button {
        font-size: 30px;
    }

    .arrow,
    button {
        background-color: inherit;
        color: #95a5a6;
    }

    button:active {
        background-color: #555;
    }
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
        justify-content: space-evenly;
    }
    @media screen and (max-width: 600px) {
        .collections {
            margin-bottom: 100px;
        }
        .navigation div {
            font-size: 20px;
        }
    }
</style>
