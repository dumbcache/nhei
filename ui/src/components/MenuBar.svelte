<script>
    import { Link } from "svelte-navigator";

    let menuList = [
        {
            name: "profile",
            src: "/images/profile.svg",
            link: "/profile",
        },
        {
            name: "collections",
            src: "/images/collections.svg",
            link: "/boards",
        },
        { name: "home", src: "/images/home.svg", link: "/" },
        { name: "refresh", src: "/images/refresh.svg", link: "" },
        { name: "add", src: "/images/add.svg", link: "/add" },
    ];
</script>

<div class="wrapper">
    {#each menuList as item (item)}
        <Link to={item.link}
            ><div
                class="link {item.name}"
                value={item.name}
                style="background-image:url({item.src})"
                on:click={item.onclick}
            >
                {item.name}
            </div></Link
        >
    {/each}
</div>

<style>
    .wrapper {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-evenly;
    }
    .wrapper * {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }
    .link {
        padding-top: 1.2rem;
        background-repeat: no-repeat;
        background-position: top;
        background-color: #000;
        color: inherit;
        font-size: small;
    }
    .link:active {
        background-color: #333;
    }

    :global(a, a:active, a:visited) {
        text-decoration: none;
        color: inherit;
    }
    @media screen and (max-width: 600px) {
        .link {
            /* padding-top: 1.5rem; */
            font-size: x-small;
        }
    }
</style>
