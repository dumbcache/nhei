<script>
    import Layout from "./Layout.svelte";
    import { window } from "./scripts/manageWindow.js";
</script>

<Layout>
    <main>
        <svelte:component this={$window} />
    </main>
</Layout>

<style>
    @media screen and (max-width: 600px) {
    }
</style>
