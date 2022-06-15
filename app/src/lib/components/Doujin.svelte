<script>
    export let doujin;
</script>

<div class="doujin">
    {#if doujin}
        <div class="data">
            <div class="cover-wrapper">
                <a href={doujin.url} target="_blank"
                    ><img
                        class="cover"
                        src={doujin.cover.url}
                        alt="doujin_image"
                        referrerpolicy="no-referrer"
                    /></a
                >
            </div>
            <div class="info">
                <p><small>#</small>{doujin.id}</p>
                <p><small>Title:</small> {doujin.titles.pretty}</p>
                <p><small>MediaId</small>{doujin.mediaId}</p>
                <!-- <p><small>Language:</small> {doujin.language}</p> -->
                <p><small>Pages:</small> {doujin.length}</p>
                <p><small>Favourites:</small> {doujin.favorites}</p>
                <button class="read">read</button>
            </div>
        </div>
        <div class="pages">
            {#each doujin.pages as page (page.url)}
                <div class="page" on:click={() => {}}>
                    <img
                        src={page.url}
                        alt={page.url}
                        width="100%"
                        referrerpolicy="no-referrer"
                        loading="lazy"
                    />
                    <div class="overlay" class:overlay={() => {}} />
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .data {
        display: flex;
        flex-flow: row-reverse;
        justify-content: space-evenly;
        align-items: center;
        gap: 2rem;
    }
    .cover-wrapper {
        position: relative;
        max-width: 300px;
    }

    .cover {
        width: 300px;
        /* margin-left: auto; */
        border-radius: 10px;
    }

    small {
        opacity: 0.6;
        user-select: none;
    }
    .read {
        background-color: #f00;
        color: black;
        border-radius: 5px;
    }
    .info {
        /* padding-left: 1rem; */
        display: flex;
        flex-flow: column;
        align-items: flex-start;
    }
    .pages {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        gap: 1rem 0rem;
        margin-top: 4rem;
    }

    .page {
        width: 160px;
        position: relative;
        /* width: 50%; */
    }
    .page > img {
        border-radius: 5px;
    }
    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.768);
    }

    @media screen and (max-width: 600px) {
        .data {
            /* display: initial; */
            flex-flow: column;
            align-items: flex-start;
            gap: 2rem;
        }

        .page {
            width: 33%;
        }
        .cover {
            width: 200px;
        }
        .doujin {
            margin-bottom: 130px;
            z-index: -1;
        }
    }
</style>
