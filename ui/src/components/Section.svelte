<script>
    import Section from "./Board/template.svelte";
    import { boards } from "../scripts/stores";

    export let location, navigate;
    let section = location.pathname.split("/").pop();
    let data;
    $: if ($boards.length !== 0) {
        section = $boards.filter((record) => record.name === section);
        data = section[0].sections;
    }
</script>

<div class="wrapper">
    {#if $boards.length !== 0}
        <Section {data} />
    {:else}
        <h4>sections</h4>
        <p class="alert">No Data Found</p>
    {/if}
</div>

<style>
    h4,
    p {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    h4 {
        opacity: 0.3;
    }
    p {
        opacity: 0.5;
        top: 55%;
        font-size: x-small;
    }

    @media screen and (max-width: 600px) {
        .wrapper {
            margin-bottom: 150px;
        }
    }
</style>
