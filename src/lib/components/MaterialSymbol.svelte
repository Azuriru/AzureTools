<script lang="ts">
    import 'material-symbols';
    import { type MaterialSymbol } from 'material-symbols';

    export let type: 'outlined' | 'rounded' | 'sharp' = 'rounded';
    export let name: MaterialSymbol;
    export let size: number | null = null;
    export let fill: 0 | 1 | boolean = 0;
</script>

<span class="material-symbol material-symbols-{type}" style:font-size={size + 'px'} style:font-variation-settings="'FILL' {+fill}">
    {name}
</span>

<style lang="scss">
    .material-symbol {
        font-size: inherit;
        font-weight: 300;
    }
</style>