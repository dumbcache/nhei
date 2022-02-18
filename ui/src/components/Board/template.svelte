<script>
    import { fade } from "svelte/transition";
    import { Link } from "svelte-navigator";
    import EditAction from "./Edit.svelte";
    import Edit from "../icons/Edit.svelte";
    import DeleteAction from "./Delete.svelte";
    import Delete from "../icons/Delete.svelte";

    export let data, type, parent;
    let action, name, cover, position;
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
        <!-- {console.log(item.cover)} -->
        <div class="collection {item.name}" in:fade={{ duration: 300 }}>
            <div
                class="edit"
                on:click={() => {
                    name = item.name;
                    cover = item.cover;
                    position = item.position;
                    action = "edit";
                    overlay = false;
                }}
            >
                <Edit />
            </div>
            <div
                class="delete"
                on:click={() => {
                    name = item.name;
                    action = "delete";
                    overlay = false;
                }}
            >
                <Delete />
            </div>
            <Link to={item.name}>
                <div class="collection-card">
                    {#if item.cover !== ""}
                        <div
                            class="cover"
                            style:background-image="url({item.cover})"
                            style:background-position="0% {item.position}%"
                        />
                    {:else}
                        <div
                            class="cover"
                            style:background-image="url('/images/empty.svg')"
                        />
                    {/if}
                    <div class="data">
                        <h4>{item.name}</h4>
                        <p>pins : {item.total}</p>
                    </div>
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

    {#if action === "edit"}
        <div class="action">
            <EditAction
                {name}
                {type}
                {parent}
                {cover}
                {position}
                on:recieve={showEditStatus}
            />
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

<slot />

<style>
    .collection-card {
        width: 280px;
        display: flex;
        flex-flow: column;
        align-items: center;
        background-color: #222;
        border-radius: 10px;
    }
    .cover {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
        border-radius: 10px;
    }

    .collection-card:hover {
        cursor: pointer;
    }
    h4 {
        font-weight: 500;
    }
    .arrow {
        background-color: inherit;
        color: inherit;
    }

    .wrapper {
        /* position: relative; */
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        gap: 1rem;
    }
    .collection {
        position: relative;
    }
    .edit,
    .delete {
        width: 25px;
        height: 25px;
        position: absolute;
        right: 15px;
        top: 10px;
        background-color: #222;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
    }
    .delete {
        top: 50px;
    }
    .edit :global(svg),
    .delete :global(svg) {
        width: 20px;
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
            width: 150px;
        }
        .edit,
        .delete {
            right: 10px;
        }
        .delete {
            top: 40px;
        }
        .cover {
            height: 120px;
        }
        h4 {
            font-size: smaller;
        }
        p {
            font-size: x-small;
        }
    }
</style>
