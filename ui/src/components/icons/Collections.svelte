<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    function sendDispatch() {
        dispatch("receive", {
            value: "collections",
        });
    }
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24"
    height="auto"
    viewBox="0 0 172 172"
    style=" fill:#000;"
    on:click={sendDispatch}
    ><g
        fill="none"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
        ><path d="M0,172v-172h172v172z" fill="none" /><g fill="#95a5a6"
            ><path
                d="M143.33333,28.66667h-114.66667c-7.91917,0 -14.33333,6.41417 -14.33333,14.33333v86c0,7.91917 6.41417,14.33333 14.33333,14.33333h114.66667c7.91917,0 14.33333,-6.41417 14.33333,-14.33333v-86c0,-7.91917 -6.41417,-14.33333 -14.33333,-14.33333zM35.83333,121.83333l25.08333,-32.25l17.91667,21.57167l25.08333,-32.32167l32.25,43z"
            /></g
        ></g
    ></svg
>
