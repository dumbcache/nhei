<script>
    import {
        home,
        profile,
        collections,
        empty,
        grid,
        add,
        refresh,
        slider,
        search,
        saved,
        save,
        ok,
        edit,
        del,
        cancel,
    } from "./Icons.svelte";
</script>

<header>
    <nav>
        {@html home()}
        {@html profile()}
        {@html collections()}
        {@html empty()}
        {@html grid()}
        {@html add()}
        {@html refresh()}
        {@html slider()}
        {@html search()}
        {@html saved()}
        {@html save()}
        {@html ok()}
        {@html del()}
        {@html edit()}
        {@html cancel()}
    </nav>
</header>

<style>
</style>
