<script>
    export let value;
    const create = (e) => {
        let formData = new FormData(e.target);
        for (let item of formData) {
            const [key, value] = item;
            console.log(console.log(key, value));
        }
    };
</script>

<div class="wrapper">
    <form on:submit|preventDefault={create}>
        <input
            name="collection"
            type="text"
            bind:value
            placeholder="collection name"
            required
        />
        <input name="sections" type="text" value="" placeholder="sections" />
        <div>
            <button type="submit">ok</button>
            <button type="cancel">cancel</button>
        </div>
    </form>
</div>

<style>
</style>
