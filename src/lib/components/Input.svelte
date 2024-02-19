<script lang="ts">
    export let value = '';
    export let placeholder = '';
    export let title = '';
    export let label = '';
    export let spacing = '';
    export let background = 'bg-surface-500';
    export let color = 'placeholder-white/50 disabled:text-white/80 text-white/80';
    export let disabled = false;
    export let maxlength: undefined | number = undefined;
</script>

<div class="flex text-sm {spacing}">
    <label class="flex flex-grow flex-col">
        {#if label}
            <div class="capitalize font-semibold mb-2">{label}</div>
        {/if}
        <input
            bind:value
            class="flex {background} {color} w-full px-3 py-2 rounded {$$props.class}"
            type="text"
            {maxlength}
            {placeholder}
            {title}
            {disabled}
        />
    </label>
</div>