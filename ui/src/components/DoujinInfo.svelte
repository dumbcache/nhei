<script>
    export let doujin = null;

    let overlayActive = "";
    let turnToggle = false;

    const toggle = (id) => {
        overlayActive = id;
        turnToggle = !turnToggle;
    };
</script>

<div class="card">
    {#if doujin}
        <div class="data">
            <div>
                <a href={doujin.url} target="_blank"
                    ><img
                        class="cover"
                        src={doujin.cover}
                        alt="doujin_image"
                        referrerpolicy="no-referrer"
                    /></a
                >
            </div>
            <div>
                <p># {doujin.id}</p>
                <p>Title: {doujin.title}</p>
                <p>Author: {doujin.author}</p>
                <p>Language: {doujin.language}</p>
                <p>Parody: {doujin.parody}</p>
            </div>
        </div>
        <div class="pages">
            {#each doujin.pages as page (page.url)}
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
    @media screen and (max-width: 600px) {
    }
</style>
