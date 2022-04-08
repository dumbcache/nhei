<script>
    import { navigate } from "svelte-navigator";
    import { doujin, doujinPresent } from "../scripts/stores";
    import { save, saved } from "./Icons.svelte";
    import Add from "../components/Add.svelte";
    let turnToggle = false;
    let toggleSave = false;
    let readMode = false;
    $: optionalCover = $doujin ? $doujin.cover : undefined;
    const toggle = (id) => {
        turnToggle = !turnToggle;
        optionalCover = turnToggle ? id : $doujin.cover;
    };
</script>

<div class="card">
    <div class="navigation">
        <button on:click={() => navigate(-1)}>{"< back"}</button>
    </div>
    {#if $doujin}
        <div class="data">
            <div class="cover-wrapper">
                <div class="button-background" />
                {#if !$doujinPresent}
                    <div
                        class="save"
                        on:click={() => {
                            toggleSave = !toggleSave;
                        }}
                    >
                        {@html save()}
                    </div>
                {:else}
                    <div class="saved">{@html saved()}</div>
                {/if}
                <a href={$doujin.url} target="_blank"
                    ><img
                        class="cover"
                        src={$doujin.cover}
                        alt="doujin_image"
                        referrerpolicy="no-referrer"
                    /></a
                >
            </div>
            <div>
                <p><small>#</small>{$doujin.id}</p>
                <p><small>Title:</small> {$doujin.title}</p>
                {#if $doujin.author}
                    <p><small>Author:</small> {$doujin.author}</p>
                {/if}
                <p><small>Language:</small> {$doujin.language}</p>
                {#if $doujin.parody}
                    <p><small>Parody:</small> {$doujin.parody}</p>
                {/if}
                <p><small>Pages:</small> {$doujin.count}</p>
                <p><small>Favourites:</small> {$doujin.favourites}</p>
                <button class="read" on:click={() => (readMode = !readMode)}
                    >read</button
                >
            </div>
        </div>
        <div class="pages">
            {#each $doujin.pages as page (page.url)}
                <div
                    class="page"
                    on:click={() => {
                        console.log(page.url);
                        toggle(page.url);
                    }}
                >
                    <img
                        src={page.url}
                        alt={page.url}
                        width="100%"
                        referrerpolicy="no-referrer"
                        loading="lazy"
                    />
                    <div
                        class="overlay"
                        class:overlay={optionalCover === page.url && turnToggle}
                    />
                </div>
            {/each}
        </div>
    {:else}
        <p class="alert">search to view</p>
    {/if}

    {#if toggleSave}
        <Add
            {optionalCover}
            on:toggle={() => {
                toggleSave = !toggleSave;
            }}
        />
    {/if}

    {#if readMode}
        <div class="read-mode">
            {#each $doujin.pages as page (page.url)}
                <div
                    class="reading-page"
                    on:click={() => {
                        readMode = !readMode;
                    }}
                >
                    <img
                        src={page.url}
                        alt={page.url}
                        referrerpolicy="no-referrer"
                    />
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .navigation {
        margin: 0.5rem;
    }

    .read {
        background-color: #f00;
        color: black;
        padding: 0.3rem;
        border-radius: 5px;
        margin-left: 0.5rem;
    }
    .read-mode {
        position: absolute;
        top: 0;
        width: 100%;
        background-color: #333;
    }
    .reading-page::-webkit-scrollbar {
        display: none;
    }
    .reading-page {
        text-align: center;
    }

    .reading-page > img {
        /* height: 100vh; */
        max-width: 600px;
        /* object-fit: cover; */
    }

    p {
        margin-left: 0.5rem;
    }
    small {
        opacity: 0.6;
        user-select: none;
    }
    .cover-wrapper {
        width: 50%;
        position: relative;
    }
    .save :global(svg),
    .saved :global(svg),
    .button-background {
        width: 50px;
        position: absolute;
        right: 5px;
        top: 5px;
    }
    .saved :global(svg) {
        fill: red;
    }

    .button-background {
        width: 40px;
        height: 40px;
        background-color: #000;
        border-radius: 50%;
        top: 10px;
        right: 10px;
    }
    .cover {
        width: 100%;
        margin-left: auto;
        border-radius: 10px;
    }
    .cover-wrapper {
        max-width: 400px;
    }
    .data {
        display: flex;
        flex-flow: row-reverse;
        justify-content: space-evenly;
        align-items: center;
    }
    .pages {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        margin-top: 1rem;
    }

    .page {
        width: 150px;
        position: relative;
    }
    .page > img {
        border-radius: 5px;
    }
    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.568);
    }

    .alert {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.3;
        user-select: none;
    }

    @media screen and (max-width: 600px) {
        .data {
            display: initial;
        }

        .page {
            width: 33%;
        }
        .card {
            margin-bottom: 130px;
            z-index: -1;
        }
        .save :global(svg),
        .saved :global(svg),
        .button-background {
            width: 40px;
            position: absolute;
        }

        .button-background {
            width: 30px;
            height: 30px;
        }

        .reading-page > img {
            width: 100%;
        }
    }
</style>
