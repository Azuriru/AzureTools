<script lang="ts" context="module">
    let id = 0;

    function getId() {
        id += 1;
        return id;
    }
</script>

<script lang="ts">
    export let id = `popup-${getId}`;
</script>

<div class="overflow-hidden rounded bg-surface-500 text-primary-100" data-popup={id}>
    <slot />
</div>