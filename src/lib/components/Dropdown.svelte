<script lang="ts" context="module">
    let close = () => {};
</script>

<script lang="ts">
    import Icon from './MaterialSymbol.svelte';
    import { type MaterialSymbol } from 'material-symbols';

    export let selectedOption = 0;
    export let options = ['a', 'b', 'c'];
    export let onSelect: (index: number, oldIndex: number) => void = () => {};

    export let width = 'w-48';
    export let height = 'h-9';
    export let spacing = '';

    export let dropdownVisible = false;

    function openDropdown() {
        dropdownVisible = !dropdownVisible;

        if (close !== closeDropdown) {
            close();
        }
        close = closeDropdown;
    }

    function closeDropdown() {
        dropdownVisible = false;
    }

    function selectOption(option: number) {
        onSelect(option, selectedOption);
        selectedOption = option;
        dropdownVisible = false;
    }

    function onClick(e: MouseEvent) {
        const target = e.target as Element;

        if (!target.closest('.dropdown')) {
            close();
        }
    }
</script>

<svelte:window on:click={onClick} />

<div class="dropdown relative rounded {width} {height} {spacing} bg-surface-500">
    <button type="button" class="dropdown-button flex items-center justify-between px-4 w-full h-full" on:click={openDropdown}>
        {options[selectedOption] ?? options[0]}
        <Icon name={dropdownVisible ? 'arrow_downward': 'arrow_upward'} />
    </button>
    <ol class="dropdown-content {dropdownVisible ? 'flex fixed' : 'hidden'} flex-col {width} bg-surface-500 z-10 rounded overflow-hidden mt-2">
        {#each options as option, i (option)}
            <button type="button" on:click={() => selectOption(i)} class="option flex items-center px-4 hover:bg-primary-500/10 hover:text-primary-400 {height}">{option}</button>
        {/each}
    </ol>
</div>