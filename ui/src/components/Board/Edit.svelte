<script>
    import { fade } from "svelte/transition";
    import { onMount, createEventDispatcher } from "svelte";
    import { status, refreshStatus } from "../../scripts/stores";
    import Ok from "../icons/Ok.svelte";

    export let name, type, parent, cover, position;
    let previous = name;
    let previousCover = cover;
    let previousPosition = position;
    let ref;
    let coverlist,
        toggle = false;
    let dispatch = createEventDispatcher();

    let edit = async () => {
        dispatch("recieve");
        let response = await fetch("http://localhost:5000/edit", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                type,
                previous,
                name: name.trim(),
                parent,
                cover: cover,
                position: position,
            }),
        });
        $status = await response.json();
        refreshStatus();
    };
    onMount(() => {
        ref.focus();
    });

    $: console.log(cover, previousCover);
    const getCovers = async () => {
        let response = await fetch("http://localhost:5000/thumbs");
        let { data } = await response.json();
        coverlist = data;
        toggle = true;
    };
</script>

<div class="wrapper" transition:fade={{ duration: 300 }}>
    <form class="form" on:submit|preventDefault={edit}>
        {#if cover === ""}
            <div
                class="cover"
                on:click={getCovers}
                style:background-image="url('images/empty.svg')"
                style:background-position="center"
            />
        {:else}
            <div
                class="cover"
                on:click={getCovers}
                style="background-image: url({cover});"
                style:background-position={position}
                style:border="1px solid #555"
            />
            <div class="position">
                <label>
                    <input
                        type="radio"
                        bind:group={position}
                        name="scoops"
                        value="top"
                    />
                    top
                </label>

                <label>
                    <input
                        type="radio"
                        bind:group={position}
                        name="scoops"
                        value="center"
                    />
                    center
                </label>

                <label>
                    <input
                        type="radio"
                        bind:group={position}
                        name="scoops"
                        value="bottom"
                    />
                    bottom
                </label>
            </div>
        {/if}
        <input
            name="collection"
            type="search"
            bind:value={name}
            placeholder="collection name"
            bind:this={ref}
            required
            autocomplete="off"
        />
        <button
            class="ok"
            disabled={(previous === name.trim() || name.trim() === "") &&
                previousCover === cover &&
                position === previousPosition}
            type="submit"><Ok /></button
        >
    </form>
</div>
{#if coverlist && toggle === true}
    <div class="cover-list">
        {#each coverlist as item}
            <img
                src={item}
                alt=""
                on:click={() => {
                    cover = item;
                    toggle = false;
                }}
            />
        {/each}
    </div>
{/if}

<style>
    .wrapper {
        position: fixed;
    }

    .form {
        max-width: 400px;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #000;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .form > * {
        margin: 0.5rem 0;
    }
    .position {
        background-color: green;
    }
    .cover {
        width: 100%;
        height: 200px;
        object-fit: cover;
        background-size: cover;
    }
    .cover:hover {
        cursor: pointer;
    }
    input {
        width: 100%;
        border: none;
        padding: 0.5rem;
        border-radius: 5px;
    }
    input:focus {
        outline: none;
    }
    button {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
    }
    button:disabled {
        cursor: not-allowed;
    }
    button :global(svg) {
        fill: red;
    }
    button:disabled :global(svg) {
        fill: #95a5a6;
    }
    .cover-list {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 90%;
        z-index: 1;
        background-color: #333;
    }
    .cover-list img {
        cursor: pointer;
        width: 25%;
    }
    @media screen and (max-width: 600px) {
        .form {
            max-width: 300px;
            font-size: smaller;
        }
        .cover-list > img {
            width: 33%;
        }
    }
</style>
