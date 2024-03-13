<script lang="ts">
    export let layout: string = '';
</script>

<span class="flex-grow truncate {layout}">
    <slot />
</span>