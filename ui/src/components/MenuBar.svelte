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
    @media screen and (max-width: 600px) {
    }
</style>
