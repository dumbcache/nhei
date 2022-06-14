<script context="module">
    export async function load({ params }) {
        console.log(params);
        return {
            props: { section: params.section },
        };
    }
</script>

<script>
    import Navigation from "$lib/components/Navigation.svelte";
    import Pin from "$lib/components/Pin.svelte";

    export let section;
</script>

<Navigation />
