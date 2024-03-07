<script lang="ts" context="module">
    let close = () => {};
</script>

<script lang="ts">
    import Icon from './MaterialSymbol.svelte';

    export let selectedOption = 0;
    export let options = ['a', 'b', 'c'];
    export let onSelect: (index: number, oldIndex: number) => void = () => {};

    export let dropdownVisible = false;
    export let dropdownClass = '';
    export let textSize = 'text-sm';
    export let width = 'w-48';
    export let height = 'h-9';
    export let spacing = '';

    let buttonWidth: number;

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


<div class="flex {textSize} {dropdownClass}">
    <slot />
    <div class="dropdown relative rounded {width} {height} {spacing} bg-slate-700">
        <button bind:clientWidth={buttonWidth} type="button" class="dropdown-button flex items-center justify-between pl-4 pr-2 w-full h-full" on:click={openDropdown}>
            {options[selectedOption] ?? options[0]}
            <span class="flex items-center text-2xl">
                <Icon name={dropdownVisible ? 'expand_less': 'expand_more'} />
            </span>
        </button>
        <ol style:width="{buttonWidth}px" class="dropdown-content flex flex-col {dropdownVisible ? 'flex fixed' : 'hidden'} bg-slate-700 z-10 rounded overflow-hidden mt-2">
            {#each options as option, i (option)}
                <button type="button" on:click={() => selectOption(i)} class="option flex items-center px-4 hover:bg-white/10 {height}">{option}</button>
            {/each}
        </ol>
    </div>
</div>