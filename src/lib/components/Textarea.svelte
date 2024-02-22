<script lang="ts">
    export let value = '';
    export let placeholder = '';
    export let title = '';
    export let textSize = 'text-sm';
    export let labelClass = '';
    export let background = 'bg-slate-700';
    export let color = 'placeholder-white/50 disabled:text-white/80 text-white/80';
    export let disabled = false;
    export let maxlength: undefined | number = undefined;
    export let rows: number = 4;
    export let resize = 'none';
</script>

<label class="flex {textSize} {labelClass}">
    <slot />
    <textarea
        bind:value
        class="flex {background} {color} w-full px-3 py-2 rounded {$$props.class}"
        style:resize
        {maxlength}
        {placeholder}
        {title}
        {disabled}
        {rows}
    />
</label>