<script>
    import Ok from "../icons/Ok.svelte";

    export let collectionName;
    const action = () => {
        // send request to server for deletion
    };
    let value;
    let disabled = true;
    $: disabled = value === collectionName ? false : true;
    let active = false;
</script>

<div class="wrapper">
    <form class="form" on:submit|preventDefault={action}>
        <div class:prev={active}>
            <p>You sure? All pins will be deleted</p>
            <button on:click={() => (active = !active)}><Ok /></button>
        </div>
        <div class:follow={!active}>
            <p>please type <b>{collectionName}</b> to delete</p>
            <input
                type="text"
                name="name"
                placeholder={collectionName}
                bind:value
                autocomplete="off"
            />
            <button type="submit" {disabled}><Ok /></button>
        </div>
    </form>
</div>

<style>
    .wrapper {
        position: fixed;
    }

    button {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
    }
    button :global(svg) {
        fill: red;
    }
    button:disabled :global(svg) {
        fill: #95a5a6;
    }
    button:disabled {
        cursor: not-allowed;
    }

    .form {
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #000;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .form * {
        margin: 0.5rem 0;
    }
    input {
        width: 100%;
        border: none;
        padding: 0.5rem;
        border-radius: 5px;
    }
    input:focus {
        outline: none;
    }
    .prev,
    .follow {
        display: none;
    }
    @media screen and (max-width: 600px) {
        .form {
            width: 80%;
            font-size: smaller;
        }
        .form * {
            margin: 0.3rem;
        }
    }
</style>
