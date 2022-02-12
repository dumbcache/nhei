<script>
    import DeleteAction from "./Delete.svelte";
    import EditAction from "./Edit.svelte";
    import Edit from "../icons/Edit.svelte";
    import Delete from "../icons/Delete.svelte";
    import { getPin } from "../../scripts/stores";
    import { navigate } from "svelte-navigator";

    export let pin;
    const invoke = () => {
        getPin(pin.id);
        navigate("/doujin");
    };
    let action,
        overlay = true;
</script>

<div class="wrapper">
    <div class="cover" on:click={invoke}>
        <img src={pin.cover} alt="cover" />
        <p class="id">{pin.id}</p>
    </div>

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
        <DeleteAction id={pin.id} />
    {/if}
</div>

<style>
    .wrapper {
        position: relative;
        border-radius: 0.5rem;
        padding: 0.5rem;
    }
    .cover :global(svg) {
        width: 100%;
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
