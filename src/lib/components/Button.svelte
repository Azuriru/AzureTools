<script lang="ts">
    import Icon from './MaterialSymbol.svelte';
    import { type MaterialSymbol } from 'material-symbols';
    export let thin = 0;
    export let width = 'flex-grow'
    export let variant = 'variant-filled-primary';
    export let size = thin ? 'text-sm' : 'text-sm';
    export let layout = '';
    export let icon: MaterialSymbol;
    export let onClick = () => {};
</script>

<button type="button" on:click={onClick} class="btn {width} {variant} {thin ? 'py-1 px-3' : 'py-2'} {layout} rounded {size} capitalize">
    {#if icon}
        <Icon name={icon} />
    {/if}
    <slot />
</button>