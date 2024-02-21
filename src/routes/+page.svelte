<script lang="ts">
    import { ImportWallets, Wallets } from '$lib/client';
    import { Row, Column } from '$lib/components/layout';
</script>

<Column name="tools" layout="space-y-2 bg-slate-950">
    <Wallets />
    {#each new Array(4) as _, i (i)}
        <Row shrink={0} layout="h-96 bg-slate-700 rounded" />
    {/each}
</Column>

<ImportWallets />