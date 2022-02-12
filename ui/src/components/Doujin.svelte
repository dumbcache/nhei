<script>
    import { doujin } from "../scripts/stores";
    import SaveIcon from "./icons/Save.svelte";
    import SavedIcon from "./icons/Saved.svelte";
    import Add from "../components/Add.svelte";
    let present = false;
    let turnToggle = false;
    let toggleSave = false;
    $: optionalCover = $doujin ? $doujin.cover : undefined;

    const toggle = (id) => {
        turnToggle = !turnToggle;
        optionalCover = turnToggle ? id : $doujin.cover;
    };
</script>

<div class="card">
    {#if $doujin}
        <div class="data">
            <div class="cover-wrapper">
                <div class="button-background" />
                {#if !present}
                    <div
                        class="save"
                        on:click={() => {
                            toggleSave = !toggleSave;
                        }}
                    >
                        <SaveIcon />
                    </div>
                {:else}
                    <div class="saved"><SavedIcon /></div>
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
                <p># {$doujin.id}</p>
                <p>Title: {$doujin.title}</p>
                {#if $doujin.author}
                    <p>Author: {$doujin.author}</p>
                {/if}
                <p>Language: {$doujin.language}</p>
                {#if $doujin.parody}
                    <p>Parody: {$doujin.parody}</p>
                {/if}
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
                    />
                    <div
                        class="overlay"
                        class:overlay={optionalCover === page.url && turnToggle}
                    />
                </div>
            {/each}
        </div>
    {/if}

    {#if toggleSave}
        <Add
            {optionalCover}
            on:toggle={() => {
                toggleSave = !toggleSave;
            }}
        />
    {/if}
</div>

<style>
    .card {
        padding: 0.2rem;
    }

    p {
        margin-left: 0.5rem;
    }
    .cover-wrapper {
        width: 50%;
        position: relative;
    }
    .cover-wrapper :global(svg) {
        width: 30px;
    }
    .save,
    .saved,
    .button-background {
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .button-background {
        width: 30px;
        height: 30px;
        background-color: #000;
        border-radius: 50%;
    }
    .cover {
        width: 100%;
        margin-left: auto;
        border-radius: 5px;
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
    }

    .page {
        flex-basis: 19%;
        position: relative;
    }
    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.568);
    }

    @media screen and (max-width: 600px) {
        .data {
            display: initial;
        }

        .page {
            flex-basis: 100%;
        }
        .card {
            margin-bottom: 130px;
            z-index: -1;
        }
    }
</style>
