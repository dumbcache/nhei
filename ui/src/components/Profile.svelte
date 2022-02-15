<script>
    import { fade } from "svelte/transition";
</script>

<h4 transition:fade={{ duration: 300 }}>Profile</h4>

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
