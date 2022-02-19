<script>
    import { activeData, defaultActiveData } from "../scripts/stores";

    const sortData = (type) => {
        if (type === "id") {
            $activeData = $activeData.sort((a, b) => a.id - b.id);
        } else if (type === "favourites") {
            $activeData = $activeData.sort(
                (a, b) => a.favourites - b.favourites
            );
        } else if (type === "old") {
            $activeData = [...$defaultActiveData].reverse();
        }
    };
    const types = ["old", "favourites", "id"];
</script>

<div class="sort-wrapper">
    {#each types as type}
        <div on:click={() => sortData(type)}>{type}</div>
    {/each}
</div>

<style>
    .sort-wrapper {
        width: max-content;
        background-color: #666;
        /* color: black; */
        box-shadow: 0px 0px 10px black;
    }
    .sort-wrapper div {
        padding: 0.2rem;
    }
    .sort-wrapper div:hover {
        cursor: pointer;
        background-color: #222;
    }
</style>
