<script>
    import { collections } from "../scripts/stores";
    import CollectionCard from "./CollectionCard.svelte";
    import Navigation from "./collections/Navigation.svelte";
    import Delete from "./icons/Delete.svelte";
    import Edit from "./icons/Edit.svelte";
</script>

<div class="wrapper">
    <Navigation />
    {#if $collections}
        <div class="collection-container">
            {#each $collections as item}
                <div class="collection {item.name}">
                    <button class="edit"><Edit /></button>
                    <button class="delete"><Delete /></button>
                    {#if !item.count}
                        <CollectionCard name={item.name} />
                    {/if}
                </div>
            {/each}
        </div>
    {:else}
        <h4>Collections</h4>
        <p class="alert">No Data Found</p>
    {/if}
</div>

<style>
    .arrow,
    button {
        background-color: inherit;
        color: inherit;
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
        opacity: 0.3;
    }
    p {
        opacity: 0.5;
        top: 55%;
        font-size: x-small;
    }
    .collection-container {
        /* position: relative; */
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
    }
    .collection {
        position: relative;
    }
    .edit,
    .delete {
        width: 30px;
        padding-top: 0.1rem;
        position: absolute;
        right: 15px;
        top: 10px;
        background-color: #eee;
        border-radius: 50%;
    }
    .delete {
        top: 50px;
    }
    .edit :global(svg),
    .delete :global(svg) {
        width: 20px;
    }
    .edit,
    .delete {
        width: 25px;
        height: 25px;
        padding-top: 0;
        right: 15px;
    }
    .delete {
        top: 40px;
    }
    @media screen and (max-width: 600px) {
        .wrapper {
            margin-bottom: 150px;
        }

        .edit,
        .delete {
            right: 10px;
        }
        .delete {
            top: 40px;
        }
    }
</style>
