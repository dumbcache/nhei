<script>
    import { fade } from "svelte/transition";
</script>

<div>
    <h1 class="title" transition:fade={{ duration: 200 }}>dCache</h1>
</div>

<style>
    div {
        display: grid;
        height: 100%;
        place-content: center;
    }
    .title {
        font-size: 8rem;
        font-weight: 900;
        background-image: linear-gradient(to right, #5dd, #5ff);
        /* background-image: radial-gradient(#f0f, #50f); */
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        user-select: none;
    }

    @media (max-width: 600px) {
        .title {
            font-size: 5rem;
        }
    }
</style>
