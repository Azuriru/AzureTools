
<script>
    import { SlideToggle } from '@skeletonlabs/skeleton';

    export let checked;
    export let label = '';
    export let desc = '';
    export let spacing = '';

    let uniqueID = `label-${Math.floor(Math.random() * 2000)}`;
</script>

<div class="flex text-sm {spacing}">
    <label class="flex flex-col flex-grow" for={uniqueID}>
        <div class="flex justify-between items-start mb-1">
            <div class="text-sm font-semibold caps-first">{label}</div>
            <SlideToggle
                bind:checked
                name={uniqueID}
                size="sm"
                background="bg-surface-500"
                active="bg-primary-500"
            />
        </div>
        <div class="text-xs text-gray-400 caps-first">{desc}</div>
    </label>
</div>
