<script context="module">
    import { fetchBoards } from "$lib/scripts/stores.js";
    export async function load({ fetch }) {
        console.log("inside layout");
        await fetchBoards();
        return {
            props: {},
        };
    }
</script>

<script>
    import Navigation from "$lib/components/Navigation.svelte";
</script>

<Navigation />
<slot />
