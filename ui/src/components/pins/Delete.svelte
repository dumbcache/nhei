<script>
    import Ok from "../icons/Ok.svelte";

    export let id;
    const action = () => {
        // send request to server for deletion
    };
</script>

<div class="wrapper">
    <div>
        <p>You sure?</p>
        <button on:click={() => {}}><Ok /></button>
    </div>
</div>

<style>
    .wrapper {
        position: fixed;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #000;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    button {
        width: 40px;
    }
    button :global(svg) {
        fill: red;
    }
    button:disabled :global(svg) {
        fill: #95a5a6;
    }

    @media screen and (max-width: 600px) {
    }
</style>
