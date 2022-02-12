<script>
    import { status } from "../scripts/stores";
</script>

<div class="status">{$status.status}</div>

<style>
    .status {
        width: fit-content;
        padding: 1em;
        background-color: #f00;
        color: #fff;
        border-radius: 5px;
    }
</style>
