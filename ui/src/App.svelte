<script>
    import DoujinInfo from "./components/DoujinInfo.svelte";
    import getDoujin from "./scripts/getDoujin";
    import Layout from "./Layout.svelte";

    let doujin;

    const getData = async (e) => {
        let { input } = e.detail;
        doujin = getDoujin(input);
    };
</script>

<Layout on:receive={getData}>
    <main>
        {#await $doujin}
            <div class="status">...loading</div>
        {:then data}
            <DoujinInfo doujin={data} />
        {/await}
    </main>
</Layout>

<style>
    @media screen and (max-width: 600px) {
    }
</style>
