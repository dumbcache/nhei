<script>
    import { pins } from "../scripts/stores.js";
    import Empty from "./icons/Empty.svelte";
</script>

<div class="wrapper">
    {#each $pins as pin (pin.id)}
        <Empty />
        <p>{pin.id}</p>
    {/each}
</div>
