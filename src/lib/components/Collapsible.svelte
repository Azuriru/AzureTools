<script lang="ts">
    import { onMount } from 'svelte';

    export let wrapperClasses = '';
    export let headerClasses = '';
    export let contentClasses = '';
    export let uncollapsed = false;
    export let showArrow = false;

    let content;

    function onClick(e) {
        const content = e.currentTarget.nextElementSibling;
        if (uncollapsed) {
            content.style.height = 0;
        } else {
            content.style.height = `${content.scrollHeight}px`;
        }

        uncollapsed = !uncollapsed;
    }

    onMount(() => {
        content.style.height = uncollapsed ? `${content.scrollHeight}px` : 0;
    });
</script>

<div class="collapsible-wrapper {wrapperClasses}">
    <button type="button" on:click={onClick} class="collapsible-toggle {showArrow ? 'flex items-center pr-4' : ''} {headerClasses}">
        <slot name="header" />
        {#if showArrow}
        {/if}
    </button>
    <div bind:this={content} class="collapsible-content transition-[height] {contentClasses}">
        <slot />
    </div>
</div>

<style lang="scss">
    .collapsible-wrapper {
        overflow: hidden;
    }

    .collapsible-toggle {
        overflow: hidden;
        position: relative;
    }

    .collapsible-content {
        height: 0;
    }
</style>