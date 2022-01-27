<script>
    import Profile from "./icons/Profile.svelte";
    import Collections from "./icons/Collections.svelte";
    import Home from "./icons/Home.svelte";
</script>

<div class="menu-container">
    <button class="profile" value="profile"><Profile />profile</button>
    <button class="collections" value="collections"
        ><Collections />collections</button
    >
    <button class="home" value="home"><Home />home</button>
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
