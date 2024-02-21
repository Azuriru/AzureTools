<script lang="ts">
    export let vr: 0 | 1 = 0;
    export let spacing = vr ? 'mx-6' : 'my-6';
    export let size = vr ? 'border-l-2': 'border-t-2';
    export let color = 'border-white/20';
</script>

<hr class="divider {spacing} {size} {color}" class:h-full={vr} />