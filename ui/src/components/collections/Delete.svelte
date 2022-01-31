<script>
    export let collectionName;
    const action = () => {
        // send request to server for deletion
    };
    let value;
    let disabled = true;
    $: disabled = value === collectionName ? false : true;
</script>

<div class="wrapper">
    <div class="form">
        <form on:submit|preventDefault={action}>
            <p>please type <b>{collectionName}</b> to delete</p>
            <input
                type="text"
                name="name"
                placeholder={collectionName}
                bind:value
                required
            />
            <button type="submit" {disabled}>ok</button>
        </form>
    </div>
</div>

<style>
    .wrapper {
        position: fixed;
    }

    button {
        border-radius: 5px;
        background-color: #f00;
    }
    button:disabled {
        background-color: #555;
    }
    button:active {
        background-color: #999;
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
