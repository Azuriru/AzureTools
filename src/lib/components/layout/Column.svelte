<script lang="ts">
    export let name: string = ''
    export let layout: string = '';
    export let grow: 0 | 1 = 1;
    export let align: null | 0 | 1 | 2 = null;
    export let justify: null | 0 | 1 | 2 | 3 | 4 | 5 = null;

    const ALIGN_TYPES = ['items-start', 'items-center', 'items-end'];
    const JUSTIFY_TYPES = ['justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around', 'justify-evenly'];
</script>

<div class="{name ?? ''} flex flex-col {layout} {ALIGN_TYPES[align ?? -1 ] ?? ''} {JUSTIFY_TYPES[justify ?? -1] ?? ''}" class:flex-grow={grow}>
    <slot />
</div>