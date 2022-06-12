<script>
    // import Navigation from "../../components/Navigation.svelte";
    import { browser } from "$app/env";
    import { boards, fetchBoards } from "$lib/stores/boards.js";
    (async () => {
        console.log(await fetchBoards());
        console.log($boards[0].boards);
    })();
</script>

<!-- <Navigation active={false} /> -->
<slot />
<div>{$boards[0]}</div>
