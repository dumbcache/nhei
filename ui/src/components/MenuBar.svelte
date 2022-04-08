<script>
    import { createEventDispatcher } from "svelte";

    import { Link } from "svelte-navigator";

    let menuList = [
        { name: "home", src: "/images/home.svg", link: "/" },
        {
            name: "collections",
            src: "/images/collections.svg",
            link: "/boards",
        },
    ];

    const dispatch = createEventDispatcher();
    const add = () => {
        dispatch("recieve");
    };
</script>

<div class="menubar-wrapper">
    {#each menuList as item (item)}
        <Link to={item.link}
            ><div class="link {item.name}" value={item.name}>
                <img src={item.src} alt={item.name} />
                <p class="button-tag">
                    {item.name}
                </p>
            </div>
        </Link>
    {/each}
    <div class="link add" on:click={add}>
        <img src="/images/add.svg" alt="add" />
        <p class="button-tag">add</p>
    </div>
    <div class="link profile">
        <img src="/images/profile.svg" alt="profile" />
        <p class="button-tag">profile</p>
    </div>
</div>

<style>
    .menubar-wrapper {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-evenly;
    }
    .menubar-wrapper * {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }
    .link {
        background-repeat: no-repeat;
        background-position: top;
        background-color: #000;
        color: inherit;
        font-size: small;
        cursor: pointer;
    }
    .link:active {
        background-color: #333;
    }

    .button-tag {
        display: none;
    }
    :global(a, a:active, a:visited) {
        text-decoration: none;
        color: inherit;
    }
    img {
        width: 30px;
    }
    @media screen and (max-width: 600px) {
        .link {
            /* padding-top: 1.5rem; */
            font-size: x-small;
        }
        .button-tag {
            display: initial;
        }
        img {
            width: initial;
        }
    }
</style>
