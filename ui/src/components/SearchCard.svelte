<script>
    import Empty from "../icons/Empty.svelte";
    export let details;
</script>

<div class="wrapper">
    <img src="" alt="cover" />
    <p class="id">{details.id}</p>
    <p class="save">
        <svg width="20" height="20">
            <circle cx="10" cy="10" r="10" stroke-width="4" fill="orange" />
        </svg>
    </p>
</div>

<style>
    .wrapper {
        position: relative;
        border-radius: 0.5rem;
        padding: 0.5rem;
    }
    .save {
        position: absolute;
        right: 0px;
        top: 0px;
    }

    @media screen and (max-width: 600px) {
    }
</style>
