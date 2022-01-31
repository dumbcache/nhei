<script>
    export let collectionName;
    let edit = () => {};
</script>

<div class="wrapper">
    <form on:submit|preventDefault={edit}>
        <input
            name="collection"
            type="text"
            bind:value={collectionName}
            placeholder="collection name"
            required
        />
        <div>
            <button type="submit">ok</button>
            <button type="cancel">cancel</button>
        </div>
    </form>
</div>

<style>
</style>
