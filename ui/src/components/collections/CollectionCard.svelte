<script>
    import { collections } from "../../scripts/stores";
    import Delete from "../icons/Delete.svelte";
    import Edit from "../icons/Edit.svelte";
    import Empty from "../icons/Empty.svelte";
</script>

<div class="wrapper">
    {#each $collections as item}
        <div class="collection {item.name}">
            <button class="edit"><Edit /></button>
            <button class="delete"><Delete /></button>
            {#if !item.count}
                <div class="collection-card">
                    <Empty />
                    <h4>{item.name}</h4>
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .collection-card {
        width: 280px;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .collection-card :global(svg) {
        width: 100%;
    }
    .collection-card:hover {
        cursor: pointer;
    }
    h4 {
        font-weight: 500;
    }
    .arrow,
    button {
        background-color: inherit;
        color: inherit;
    }

    button:active {
        background-color: #555;
    }
    .wrapper {
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
        .collection-card {
            width: 45vw;
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
