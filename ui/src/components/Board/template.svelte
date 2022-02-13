<script>
    import { Link } from "svelte-navigator";
    import EditAction from "./Edit.svelte";
    import Edit from "../icons/Edit.svelte";
    import DeleteAction from "./Delete.svelte";
    import Delete from "../icons/Delete.svelte";
    import Empty from "../icons/Empty.svelte";

    export let data, type, parent;
    let action;
    let name;
    let overlay = true;

    const showEditStatus = (e) => {
        overlay = true;
        action = "";
    };
    const showDeleteStatus = (e) => {
        overlay = true;
        action = "";
    };
</script>

<div class="wrapper">
    {#each data as item}
        <div class="collection {item}">
            <button
                class="edit"
                on:click={() => {
                    name = item;
                    action = "edit";
                    overlay = false;
                }}
                ><Edit />
            </button>
            <button
                class="delete"
                on:click={() => {
                    name = item;
                    action = "delete";
                    overlay = false;
                }}
                ><Delete />
            </button>
            <Link to={item}>
                <div class="collection-card">
                    <Empty />
                    <h4>{item}</h4>
                </div>
            </Link>
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
    <slot />
    {#if action === "edit"}
        <div class="action">
            <EditAction {name} {type} {parent} on:recieve={showEditStatus} />
        </div>
    {:else if action === "delete"}
        <div class="action">
            <DeleteAction
                {name}
                {type}
                {parent}
                on:recieve={showDeleteStatus}
            />
        </div>
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
    .overlay,
    .action {
        z-index: 1;
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
