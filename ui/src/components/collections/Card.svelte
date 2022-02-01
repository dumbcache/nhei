<script>
    import { collections } from "../../scripts/stores";
    import Delete from "../icons/Delete.svelte";
    import DeleteAction from "./Delete.svelte";
    import EditAction from "./Edit.svelte";
    import Edit from "../icons/Edit.svelte";
    import Empty from "../icons/Empty.svelte";

    let action;
    let collectionName;
    let overlay = true;
</script>

<div class="wrapper">
    {#each $collections as item}
        <div class="collection {item.name}">
            <button
                class="edit"
                on:click={() => {
                    collectionName = item.name;
                    action = "edit";
                    overlay = false;
                }}><Edit /></button
            >
            <button
                class="delete"
                on:click={() => {
                    collectionName = item.name;
                    action = "delete";
                    overlay = false;
                }}><Delete /></button
            >
            {#if !item.count}
                <div class="collection-card">
                    <Empty />
                    <h4>{item.name}</h4>
                </div>
            {/if}
        </div>
    {/each}
    <div
        class="overlay"
        class:overlay-visible={overlay}
        on:click={() => {
            action = "";
            overlay = true;
        }}
    />
    {#if action === "edit"}
        <EditAction {collectionName} />
    {:else if action === "delete"}
        <DeleteAction {collectionName} />
    {/if}
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
    .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #333;
        opacity: 0.7;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .overlay-visible {
        display: none;
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
