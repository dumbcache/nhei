<script>
    import Search from "./icons/Search.svelte";
    import { searchValue, getDoujin } from "../scripts/stores.js";
    import { navigate } from "svelte-navigator";
    $: disabled = $searchValue.trim().length === 0;
    const getData = () => {
        getDoujin($searchValue.trim());
        navigate("/doujin");
    };
</script>

<form on:submit|preventDefault={getData}>
    <div class="searchbar-wrapper">
        <input
            class="search"
            type="search"
            placeholder="enter id"
            bind:value={$searchValue}
        />
        <button class="search-button" {disabled} type="submit"
            ><Search /></button
        >
    </div>
</form>

<style>
    .searchbar-wrapper {
        display: grid;
        grid-template-columns: 90% 10%;
        padding: 0.2rem;
    }
    .search {
        width: 100%;
        border: none;
        padding: 0.5rem;
        border-radius: 5px;
    }
    .search:focus {
        outline: none;
    }
    .search-button {
        border-radius: 5px;
        background-color: #f00;
    }
    .search-button:disabled {
        background-color: #555;
    }
    .search-button:active {
        background-color: #999;
    }

    @media screen and (max-width: 600px) {
    }
</style>
