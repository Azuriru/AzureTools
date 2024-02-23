<script lang="ts">
    export let labelClass = '';
    export let textSize = 'text-sm';
    export let value = '';
    export let placeholder = '';
    export let title = '';
    export let type = 'text';
    export let disabled = false;
    export let maxlength: undefined | number = undefined;
    export let size: undefined | number = undefined;
    export let autofocus = false;
    export let hasFocus = autofocus;
    export let background = 'bg-slate-700';
    export let color = 'placeholder-white/50 disabled:text-white/80 text-white/80';

    // let input: HTMLInputElement;
    function onMount(node: HTMLInputElement) {
        node.type = type;

        if (autofocus) {
            node.focus();
        }
    }
</script>

<label class="flex {textSize} {labelClass}">
    <slot />
    <input
        use:onMount
        bind:value
        on:focus={() => hasFocus = true}
        on:blur={() => hasFocus = false}
        class="flex {background} {color} px-3 py-2 rounded {$$props.class}"
        {placeholder}
        {title}
        {disabled}
        {maxlength}
        {size}
    />
</label>
