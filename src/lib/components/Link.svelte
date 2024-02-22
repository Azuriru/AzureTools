<script lang="ts">
    export let href = '';
    export let layout = '';
</script>

<a {href} class={layout}>
    <slot />
</a>