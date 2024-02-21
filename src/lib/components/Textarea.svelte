<script lang="ts">
    export let value = '';
    export let placeholder = '';
    export let title = '';
    export let label = '';
    export let spacing = '';
    export let background = 'bg-slate-700';
    export let color = 'placeholder-white/50 disabled:text-white/80 text-white/80';
    export let disabled = false;
    export let maxlength: undefined | number = undefined;
    export let rows: number = 4;
</script>

{#if label}
    <div class="flex text-sm {spacing}">
        <label class="flex flex-grow flex-col">
            {#if label}
                <div class="font-semibold whitespace-pre-line mb-2">{label}</div>
            {/if}
            <textarea
                bind:value
                class="flex {background} {color} w-full px-3 py-2 rounded {$$props.class}"
                {maxlength}
                {placeholder}
                {title}
                {disabled}
                {rows}
            />
        </label>
    </div>
{:else}
    <label class="flex flex-grow">
        <textarea
            bind:value
            class="flex {background} {color} w-full px-3 py-2 rounded {$$props.class}"
            {maxlength}
            {placeholder}
            {title}
            {disabled}
            {rows}
        />
    </label>
{/if}