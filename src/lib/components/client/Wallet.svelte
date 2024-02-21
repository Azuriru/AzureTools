<script lang="ts">
    import { t } from '$lib/i18n';
    import { wallets } from '$lib/util/wallets';
    import { getBalance, formatBalance } from '$lib/util/wallet';
    import { Row, Column } from '$lib/components/layout';
    import { Button, Divider, MaterialSymbol } from '$lib/components';
    import { Tab, TabGroup } from '@skeletonlabs/skeleton';
    import { type Hex } from 'viem';

    export let selectedTab = 0;
    export let address: Hex;
    export let compact: 0 | 1 = 0;

    const tablist = [
        'wallet.tokens',
        'wallet.nfts',
        'wallet.activity'
    ];
</script>

{#if compact}
    <Row
        name="wallet"
        grow={0}
        shrink={1}
        layout="py-2 px-4 rounded overflow-hidden bg-slate-600"
    >
        <Row name="address" grow={0} layout="w-2/5">
            <span class="flex-1 overflow-hidden text-ellipsis text-sm">{address}</span>
            <Button type={0} bg="" layout="text-lg">
                <MaterialSymbol name="content_copy" />
            </Button>
        </Row>
        <Divider vr={1} spacing="mx-3" />
        <Row name="balance" layout="h-full whitespace-nowrap overflow-hidden">
            {#await getBalance(address)}
                {$t('wallet.balance-loading')}
            {:then { chain, usdt }}
                <span class="flex-1 text-center">
                    {formatBalance(chain, 0)}
                </span>
                <Divider vr={1} spacing="mx-3" />
                <span class="flex-1 text-center text-ellipsis overflow-hidden">
                    ${formatBalance(usdt)}
                </span>
            {/await}
        </Row>
        <Button type={0} layout="flex-shrink-0 w-6 h-6 text-xl" onClick={() => $wallets.remove(address)}>
            <MaterialSymbol name="close" />
        </Button>
    </Row>
{:else}
    <Column
        name="wallet"
        grow={1}
        shrink={1}
        justify={1}
        align={1}
        layout="px-8 py-4 rounded overflow-hidden bg-slate-600 space-y-3"
    >
        <Button type={0} layout="w-6 h-6 text-xl self-end" onClick={() => $wallets.remove(address)}>
            <MaterialSymbol name="close" />
        </Button>
        <Column name="balance" align={1} layout="!mt-0 h-16">
            {#await getBalance(address)}
                <Row>
                    {$t('wallet.balance-loading')}
                </Row>
            {:then { chain, usdt }}
                <Row name="balance-chain" layout="text-3xl font-semibold mb-1">
                    {formatBalance(chain, 0)} BNB
                </Row>
                <Row name="balance-usdt" layout="">
                    ${formatBalance(usdt)} USDT
                </Row>
            {/await}
        </Column>
        <Row name="address" layout="w-full py-1 pl-3 pr-2 rounded-full bg-cyan-900">
            <span class="flex-1 overflow-hidden text-ellipsis text-xs">{address}</span>
            <Button type={0} bg="" layout="text-lg">
                <MaterialSymbol name="content_copy" />
            </Button>
        </Row>
        <TabGroup
            active="text-cyan-400 hover:text-cyan-500 border-b-2 border-cyan-400"
            hover="hover:text-cyan-500"
            flex="h-8 flex items-center w-full justify-center"
            rounded="rounded-0"
            border="border-0"
            padding=""
            class="w-full text-sm border-b-2 border-transparent"
        >
            {#each tablist as tab, i (tab)}
                <Tab bind:group={selectedTab} name={tab} value={i}>
                    {$t(tab)}
                </Tab>
            {/each}
        </TabGroup>
        <Column name="token-list" layout="w-full h-40 bg-cyan-800 justify-center items-center">
            content for tabs here
        </Column>
    </Column>
{/if}