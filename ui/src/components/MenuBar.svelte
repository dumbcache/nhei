<script>
    import ProfileIcon from "./icons/Profile.svelte";
    import CollectionsIcon from "./icons/Collections.svelte";
    import HomeIcon from "./icons/Home.svelte";
    import RefreshIcon from "./icons/Refresh.svelte";

    import { changeActiveWindow } from "../scripts/manageWindow.js";
    import { refresh } from "../scripts/refresh";
</script>

<div class="menu-container">
    <button class="profile" value="profile" on:click={changeActiveWindow}
        ><ProfileIcon />profile</button
    >
    <button
        class="collections"
        value="collections"
        on:click={changeActiveWindow}><CollectionsIcon />collections</button
    >
    <button class="home" value="home" on:click={changeActiveWindow}
        ><HomeIcon />home</button
    >
    <button class="refresh" value="refresh" on:click={refresh}
        ><RefreshIcon />refresh</button
    >
</div>

<style>
    .menu-container {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-evenly;
    }
    .menu-container * {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }
    button {
        background-color: inherit;
        color: #95a5a6;
    }
    button:active {
        background-color: #333;
    }
    @media screen and (max-width: 600px) {
        button {
            font-size: x-small;
        }
    }
</style>
