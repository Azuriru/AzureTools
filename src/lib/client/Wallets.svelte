<script lang="ts">
    import { t } from '$lib/i18n';
    import { wallets } from '$lib/util/wallets';
    import { Row } from '$lib/components/layout';
    import { Wallet } from '$lib/components/client';
</script>

{#if $wallets.state.length}
    <Row
        name="wallets"
        shrink={0}
        align={0}
        justify={5}
        layout="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 bg-slate-700 rounded gap-4 p-4"
    >
        {#each $wallets.state as address (address)}
            <Wallet {address} />
        {/each}
    </Row>
{:else}
    <Row
        name="wallets"
        shrink={0}
        align={1}
        justify={1}
        layout="h-32 bg-slate-700 rounded p-4"
    >
        {$t('wallets.empty')}
    </Row>
{/if}