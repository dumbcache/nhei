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
    <form on:submit|preventDefault={action}>
        <p>please type <b>{collectionName}</b> to delete</p>
        <input type="text" name="name" bind:value required />
        <button type="submit" {disabled}>ok</button>
    </form>
</div>

<style>
    button:disabled {
        background-color: #fff;
    }
</style>
