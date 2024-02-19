<script lang="ts">
    import 'material-symbols';
    import { type MaterialSymbol } from 'material-symbols';

    export let type: 'outlined' | 'rounded' | 'sharp' = 'rounded';
    export let name: MaterialSymbol;
    export let size: number | null = null;
</script>

<span class="material-symbol material-symbols-{type}" style:font-size={size + 'px'}>
    {name}
</span>

<style lang="scss">
    .material-symbol {
        font-size: inherit;
        font-weight: 300;
    }
</style>