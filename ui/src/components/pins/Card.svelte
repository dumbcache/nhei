<script>
    import { fly, fade } from "svelte/transition";
    import DeleteAction from "./Delete.svelte";
    import Save from "./Save.svelte";
    import Saved from "../icons/Saved.svelte";
    import Delete from "../icons/Delete.svelte";
    import { getPin } from "../../scripts/stores";
    import { navigate } from "svelte-navigator";

    export let pin, board, section;
    const invoke = () => {
        getPin(pin.id);
        navigate("/doujin");
    };
    let action,
        overlay = true;
    let toggle = () => {
        overlay = !overlay;
        action = "";
    };
</script>

<div class="card-wrapper" in:fly={{ y: 100, delay: 100 }}>
    <div class="cover" on:click={invoke}>
        <img src={pin.cover} alt="cover" referrerpolicy="no-referrer" />
        <p class="id"><small>#</small>{pin.id}</p>
    </div>

    <div
        class="save"
        on:click={() => {
            action = "save";
            overlay = !overlay;
        }}
    >
        <Saved />
    </div>
    <div
        class="delete"
        on:click={() => {
            action = "delete";
            overlay = !overlay;
        }}
    >
        <Delete />
    </div>
    <div
        class="overlay"
        class:overlay-visible={overlay}
        on:click={() => {
            action = "";
            overlay = !overlay;
        }}
    />
    {#if action === "save"}
        <Save optionalCover={pin.cover} id={pin.id} on:recieve={toggle} />
    {:else if action === "delete"}
        <DeleteAction id={pin.id} {board} {section} on:recieve={toggle} />
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

    .save,
    .delete {
        position: absolute;
        right: 15px;
        top: 10px;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        /* padding-top: 0.1rem; */
        text-align: center;
        background-color: #222;
    }
    .delete {
        top: 40px;
    }
    .save :global(svg),
    .delete :global(svg) {
        fill: #95a5a6;
        width: 20px;
    }
    .save :global(svg) {
        width: 24px;
    }

    @media screen and (max-width: 600px) {
        .save,
        .delete {
            right: 10px;
        }
        .delete {
            top: 40px;
        }
    }
</style>
