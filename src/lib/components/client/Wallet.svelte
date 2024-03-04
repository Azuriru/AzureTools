<script lang="ts">
    import { type Hex } from 'viem';
    import { t } from '$lib/i18n';
    import { removeWallet } from '$lib/util/client/user';
    import { Wallet } from '$lib/util/client/wallet';
    import { Row, Column } from '$lib/components/layout';
    import { Button, Divider, Link, MaterialSymbol } from '$lib/components';
    import { Tab, TabGroup } from '@skeletonlabs/skeleton';
    import { copy } from '$lib/util';

    export let selectedTab = 0;
    export let privateKey: Hex;
    export let compact: 0 | 1 = 0;

    const wallet = new Wallet(privateKey);
    const { address } = wallet;
    const tablist = [
        'wallet.tokens',
        'wallet.nfts',
        'wallet.activity'
    ] as const;
</script>

{#if compact}
    <Link
        layout="wallet flex flex-shrink-0 py-2 pl-4 pr-2 rounded overflow-hidden bg-slate-600"
        href="/wallets/{address}"
    >
        <Row name="address" grow={0} layout="w-2/5">
            <span class="flex-1 overflow-hidden text-ellipsis text-sm">{address}</span>
            <Button type={0} layout="text-lg" onClick={(e) => (e.preventDefault(), copy(address))}>
                <MaterialSymbol name="content_copy" />
            </Button>
        </Row>
        <Divider vr={1} spacing="mx-3" />
        <Row name="balance" layout="h-full whitespace-nowrap overflow-hidden">
            {#await wallet.getBalance()}
                {$t('wallet.balance-loading')}
            {:then { chain, usdt }}
                <span class="flex-1 text-center">
                    {chain}
                </span>
                <Divider vr={1} spacing="mx-3" />
                <span class="flex-1 text-center text-ellipsis overflow-hidden">
                    ${usdt}
                </span>
            {/await}
        </Row>
        <Button type={0} layout="flex-shrink-0 w-6 h-6 text-xl" onClick={(e) => (e.preventDefault(), removeWallet(privateKey))}>
            <MaterialSymbol name="close" />
        </Button>
    </Link>
{:else}
    <Link
        layout="wallet flex flex-col flex-grow justify-center items-center px-8 py-4 rounded overflow-hidden bg-slate-600 space-y-3"
        href="/wallets/{address}"
    >
        <Button type={0} bg="bg-cyan-500" layout="w-6 h-6 text-xl self-end" onClick={(e) => (e.preventDefault(), removeWallet(privateKey))}>
            <MaterialSymbol name="close" />
        </Button>
        <Column name="balance" align={1} layout="!mt-0 h-16">
            {#await wallet.getBalance()}
                <Row>
                    {$t('wallet.balance-loading')}
                </Row>
            {:then { chain, usdt }}
                <Row name="balance-chain" layout="text-3xl font-semibold mb-1">
                    {wallet.formatBalance(chain, 0)} BNB
                </Row>
                <Row name="balance-usdt" layout="">
                    ${wallet.formatBalance(usdt)} USDT
                </Row>
            {/await}
        </Column>
        <Row name="address" layout="w-full py-1 pl-3 pr-2 rounded-full bg-cyan-900">
            <span class="flex-1 overflow-hidden text-ellipsis text-xs">{address}</span>
            <Button type={0} layout="text-lg" onClick={(e) => (e.preventDefault(), copy(address))}>
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
    </Link>
{/if}