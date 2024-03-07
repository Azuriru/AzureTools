<script lang="ts">
    import { formatEther } from 'viem';
    import { t } from '$lib/i18n';
    import { removeWallet } from '$lib/util/client/user';
    import { type WalletInterface } from '$lib/util/client/wallet';
    import { Row, Column } from '$lib/components/layout';
    import { Button, Divider, Link, MaterialSymbol } from '$lib/components';
    import { Tab, TabGroup } from '@skeletonlabs/skeleton';
    import { clients } from '$lib/util/client/wallets';
    import { getNetworkTokens } from '$lib/util/tokens';
    import { copy } from '$lib/util';
    import { NETWORKS } from '$lib/util/wallets';

    export let client: WalletInterface;
    export let compact: 0 | 1 = 0;

    let selectedTab = 0;

    const { address, privateKey } = client;
    const tablist = [
        'wallet.tokens',
        'wallet.nfts',
        'wallet.activity'
    ] as const;

    const tokens = getNetworkTokens(NETWORKS.ETHEREUM);
    const publicClient = $clients[NETWORKS.ETHEREUM];

    if (publicClient) {
        Promise.all(
            tokens.map(async ({ address }) => await client.getBalance(publicClient, address))
        ).then(console.log);

    }

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
        <Row name="balance" justify={1} layout="h-full whitespace-nowrap overflow-hidden">
            {#await client.getBalances($clients)}
                {$t('wallet.balance-loading')}
            {:then balances}
                {#each balances as currency, index (currency)}
                    {#if index !== 0}
                        <Divider vr={1} spacing="mx-3" />
                    {/if}
                    <span class="flex-1 text-center truncate">
                        {formatEther(currency.balance)}
                    </span>
                {/each}
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
            {#await client.getBalances($clients)}
                <Row>
                    {$t('wallet.balance-loading')}
                </Row>
            {:then balances}
                <!-- todo: convert all balances to usdt -->
                {@const { balance, symbol } = balances[0]}
                <Row name="balance-chain" layout="text-3xl font-semibold mb-1 text-center">
                    {formatEther(balance)} {symbol}
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