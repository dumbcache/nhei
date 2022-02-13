<script>
    import DeleteAction from "./Delete.svelte";
    import Save from "./Save.svelte";
    import Ok from "../icons/Ok.svelte";
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

    <div
        class="edit"
        on:click={() => {
            action = "edit";
            overlay = false;
        }}
    >
        <Ok />
    </div>
    <div
        class="delete"
        on:click={() => {
            action = "delete";
            overlay = false;
        }}
    >
        <Delete />
    </div>
    <div
        class="overlay"
        class:overlay-visible={overlay}
        on:click={() => {
            action = "";
            overlay = true;
        }}
    />
    {#if action === "edit"}
        <Save />
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
        background-color: black;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        /* padding-top: 0.1rem; */
        text-align: center;
    }
    .delete {
        top: 40px;
    }
    .edit :global(svg),
    .delete :global(svg) {
        fill: #f00;
        width: 100%;
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
