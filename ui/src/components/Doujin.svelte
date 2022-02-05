<script>
    import { doujin } from "../scripts/getDoujin";

    let overlayActive = "";
    let turnToggle = false;

    const toggle = (id) => {
        overlayActive = id;
        turnToggle = !turnToggle;
    };
</script>

<div class="card">
    {#if $doujin}
        <div class="data">
            <div>
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
                <p>Author: {$doujin.author}</p>
                <p>Language: {$doujin.language}</p>
                <p>Parody: {$doujin.parody}</p>
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
                        class:overlay={overlayActive === page.url && turnToggle}
                    />
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .card {
        /* padding: 0.5rem; */
        padding-top: 0;
    }
    p {
        margin-left: 0.5rem;
    }
    .cover {
        width: 100%;
        margin-left: auto;
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
        .cover {
            width: 60%;
        }
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
