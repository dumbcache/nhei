<script>
    import {
        activeData,
        defaultActiveData,
        activePinData,
        defaultActivePinData,
    } from "../scripts/stores";
    export let type;

    const sortData = (type) => {
        if (type === "id") {
            $activePinData = $activePinData.sort((a, b) => b.id - a.id);
        } else if (type === "favourites") {
            $activePinData = $activePinData.sort(
                (a, b) => b.favourites - a.favourites
            );
        } else if (type === "A-Z") {
            $activeData = $activeData.sort((a, b) => {
                a = a.name.toLowerCase();
                b = b.name.toLowerCase();
                if (a > b) {
                    return 1;
                } else if (a < b) {
                    return -1;
                } else {
                    return 0;
                }
            });
        } else if (type === "Z-A") {
            $activeData = $activeData.sort((a, b) => {
                a = a.name.toLowerCase();
                b = b.name.toLowerCase();
                if (a > b) {
                    return -1;
                } else if (a < b) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if (type === "old") {
            $activePinData = [...$defaultActivePinData].reverse();
            $activeData = [...$defaultActiveData].reverse();
        } else {
            $activePinData = [...$defaultActivePinData];
            $activeData = [...$defaultActiveData];
        }
    };
    const sortTypes = {
        board: ["default", "old", "A-Z", "Z-A"],
        section: ["default", "old", "favourites", "id", "A-Z", "Z-A"],
        pin: ["default", "old", "favourites", "id"],
    };
    let types = sortTypes[type];
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
        user-select: none;
    }
    .sort-wrapper div:hover {
        cursor: pointer;
        background-color: #222;
    }

    @media screen and (max-width: 600px) {
        .sort-wrapper {
            width: 100px;
        }
    }
</style>
