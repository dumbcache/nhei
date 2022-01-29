<script>
    import { changeActiveWindow } from "../scripts/manageWindow.js";
    import { refresh } from "../scripts/refresh";

    let menuList = [
        {
            name: "profile",
            src: "/images/profile.svg",
            onclick: changeActiveWindow,
        },
        {
            name: "collections",
            src: "/images/collections.svg",
            onclick: changeActiveWindow,
        },
        { name: "home", src: "/images/home.svg", onclick: changeActiveWindow },
        { name: "refresh", src: "/images/refresh.svg", onclick: refresh },
        { name: "add", src: "/images/add.svg", onclick: undefined },
    ];
</script>

<div class="menu-container">
    {#each menuList as item (item)}
        <button
            class={item.name}
            value={item.name}
            style="background-image:url({item.src})"
            on:click={item.onclick}
            >{item.name}
        </button>
    {/each}
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
        padding-top: 1.2rem;
        background-repeat: no-repeat;
        background-position: top;
        background-color: #000;
        color: #95a5a6;
        font-size: small;
    }
    button:active {
        background-color: #333;
    }
    @media screen and (max-width: 600px) {
        button {
            padding-top: 1.5rem;
            font-size: x-small;
        }
    }
</style>
