<script>
    import { onMount } from "svelte";
    import Ok from "../icons/Ok.svelte";

    export let collectionName;
    let ref;
    let edit = () => {};
    onMount(() => {
        ref.focus();
    });
</script>

<div class="wrapper">
    <div class="form">
        <form on:submit|preventDefault={edit}>
            <input
                name="collection"
                type="text"
                bind:value={collectionName}
                placeholder="collection name"
                bind:this={ref}
                required
            />
            <button type="submit"><Ok /></button>
        </form>
    </div>
</div>

<style>
    .wrapper {
        position: fixed;
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
    input {
        width: 100%;
        border: none;
        padding: 0.5rem;
        border-radius: 5px;
    }
    input:focus {
        outline: none;
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
