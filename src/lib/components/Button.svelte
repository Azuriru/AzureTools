<script lang="ts">
    import type { MouseEventHandler } from 'svelte/elements';
    import { type MaterialSymbol } from 'material-symbols';
    import Icon from './MaterialSymbol.svelte';

    export let type: 0 | 1 | 2 = 1;
    export let thin = 0;
    export let width = 'flex-grow';
    export let bg = type ? 'bg-cyan-500' : '';
    export let size = thin ? 'text-sm' : 'text-sm';
    export let layout = '';
    export let icon: MaterialSymbol | undefined = undefined;
    export let onClick: MouseEventHandler<HTMLButtonElement> = () => {};

    let classes = layout;

    switch(type) {
        case 0:
            classes = `flex justify-center items-center p-0 ${layout} ${bg}`;
            break;
        case 1:
            classes = `${width} ${bg} ${thin ? 'py-1 px-3' : 'py-2'} ${layout} rounded ${size}`;
            break;
    }
</script>

<button type="button" on:click={onClick} class="btn {classes}">
    {#if icon}
        <Icon name={icon} />
    {/if}
    <slot />
</button>