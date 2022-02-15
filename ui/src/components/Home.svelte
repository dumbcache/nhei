<script>
    import { fade } from "svelte/transition";
    export let location, navigate;
</script>

<h4 in:fade={{ duration: 200 }}>Home</h4>

<style>
    h4 {
        opacity: 0.3;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        user-select: none;
    }
</style>
