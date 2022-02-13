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

<div class="card-wrapper">
    <div class="cover" on:click={invoke}>
        <img src={pin.cover} alt="cover" referrerpolicy="no-referrer" />
        <p class="id"><small>#</small>{pin.id}</p>
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
    .card-wrapper {
        position: relative;
        border-radius: 0.5rem;
    }
    img {
        width: 100%;
        border-radius: 5px;
    }
    small {
        opacity: 0.6;
        user-select: none;
    }

    .overlay {
        z-index: 1;
    }

    .edit,
    .delete {
        position: absolute;
        right: 15px;
        top: 10px;
        background-color: #eee;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        padding-top: 0.1rem;
    }
    .delete {
        top: 40px;
    }
    .edit :global(svg),
    .delete :global(svg) {
        width: 20px;
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
