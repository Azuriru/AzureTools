<script lang="ts">
    export let name: string = '';
    export let layout: string = '';
    export let grow: 0 | 1 | boolean = 1;
    export let shrink: 0 | 1 = 1;
    export let align: 0 | 1 | 2 = 1;
    export let justify: null | 0 | 1 | 2 | 3 | 4 | 5 = null;

    const ALIGN_TYPES = ['items-start', 'items-center', 'items-end'];
    const JUSTIFY_TYPES = ['justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around', 'justify-evenly'];
</script>

<div class="{name ?? ''} flex {layout} {ALIGN_TYPES[align]} {JUSTIFY_TYPES[justify ?? -1] ?? ''}" class:flex-grow={grow} class:flex-shrink-0={!shrink}>
    <slot />
</div>