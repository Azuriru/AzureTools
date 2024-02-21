<script lang="ts">
    export let vertical: 0 | 1 = 0;
    export let spacing = vertical ? 'mx-6' : 'my-6';
    export let size = vertical ? 'border-l-2': 'border-t-2';
    export let color = 'border-white/20';
</script>

<hr class="divider {spacing} {size} {color}" class:h-full={vertical} />