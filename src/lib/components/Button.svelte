<script lang="ts">
    import Icon from './MaterialSymbol.svelte';
    import { type MaterialSymbol } from 'material-symbols';

    export let type: 0 | 1 = 1;
    export let thin = 0;
    export let width = 'flex-grow'
    export let bg = 'bg-cyan-500';
    export let size = thin ? 'text-sm' : 'text-sm';
    export let layout = '';
    export let icon: MaterialSymbol | undefined = undefined;
    export let onClick = () => {};

    let classes = type
        ? `${width} ${bg} ${thin ? 'py-1 px-3' : 'py-2'} ${layout} rounded ${size}`
        : `flex justify-center items-center p-0 ${layout} ${bg}`;
</script>

<button type="button" on:click={onClick} class="btn {classes}">
    {#if icon}
        <Icon name={icon} />
    {/if}
    <slot />
</button>