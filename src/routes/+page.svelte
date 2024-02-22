<script lang="ts">
    import { ImportWallets, Wallets } from '$lib/client';
    import { Row } from '$lib/components/layout';
</script>

<Row name="tools" layout="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 auto-rows-[500px] rounded gap-2">
    <Wallets compact={1} controls={0} />
    {#each new Array(4) as _, i (i)}
        <Row shrink={0} layout="h-full bg-slate-700 rounded" />
    {/each}
</Row>

<ImportWallets />