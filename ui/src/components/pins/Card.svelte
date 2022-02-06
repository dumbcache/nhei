<script>
    import Empty from "../icons/Empty.svelte";
    import DeleteAction from "./Delete.svelte";
    import EditAction from "./Edit.svelte";
    import Edit from "../icons/Edit.svelte";
    import Delete from "../icons/Delete.svelte";
    export let details;
    let action,
        overlay = true;
</script>

<div class="wrapper">
    <!-- <img src="" alt="cover" /> -->
    <Empty />
    <p class="id">{details.id}</p>

    <button
        class="edit"
        on:click={() => {
            action = "edit";
            overlay = false;
        }}
        ><Edit />
    </button>
    <button
        class="delete"
        on:click={() => {
            action = "delete";
            overlay = false;
        }}
        ><Delete />
    </button>
    <div
        class="overlay"
        class:overlay-visible={overlay}
        on:click={() => {
            action = "";
            overlay = true;
        }}
    />
    {#if action === "edit"}
        <EditAction />
    {:else if action === "delete"}
        <DeleteAction id={details.id} />
    {/if}
</div>

<style>
    .wrapper {
        position: relative;
        border-radius: 0.5rem;
        padding: 0.5rem;
    }
    .overlay {
        z-index: 1;
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
        .edit,
        .delete {
            right: 10px;
        }
        .delete {
            top: 40px;
        }
    }
</style>
