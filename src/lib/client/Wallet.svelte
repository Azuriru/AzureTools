<script lang="ts">
    import { formatEther } from 'viem';
    import { t } from '$lib/i18n';
    import { removeWallet } from '$lib/util/client/user';
    import { type WalletInterface } from '$lib/util/client/wallet';
    import { Row, Column } from '$lib/components/layout';
    import { Button, Divider, Link, MaterialSymbol } from '$lib/components';
    import { Tab, TabGroup } from '@skeletonlabs/skeleton';
    import { currentUser } from '$lib/util/client/user';
    import { clients } from '$lib/util/client/wallets';
    import { tokenCache } from '$lib/util/client/cache';
    import { getNetworkTokens } from '$lib/util/tokens';
    import { copy } from '$lib/util';
    import { getNetworkName } from '$lib/util/wallets';
    export let client: WalletInterface;
    export let compact: 0 | 1 = 0;

    let selectedTab = 0;

    const { address, privateKey } = client;
    const tablist = [
        'wallet.tokens',
        'wallet.nfts'
    ] as const;

    $: networkTokens = $currentUser ? getNetworkTokens($currentUser.networks) : [];
    $: tokens = Promise.all(networkTokens.map(async ({ network, address }) => {
        const currentNetwork = $clients[network];

        if (currentNetwork) {
            return {
                balance: await client.getBalance(currentNetwork, address),
                ...await $tokenCache[address]
            };
        }

        return null;
    }));
</script>

{#if compact}
    <Link
        layout="wallet flex flex-shrink-0 py-2 pl-4 pr-2 rounded overflow-hidden bg-slate-600"
        href="/wallets/{address}"
    >
        <Button type={0} layout="address flex-grow-0 w-2/5 text-lg" onClick={(e) => (e.preventDefault(), copy(address))}>
            <span class="flex-1 overflow-hidden text-ellipsis text-sm">{address}</span>
            <MaterialSymbol name="content_copy" />
        </Button>
        <Divider vr={1} spacing="mx-3" />
        <Row name="balance" justify={1} layout="h-full whitespace-nowrap overflow-hidden">
            {#await client.getBalances($clients)}
                {$t('wallet.loading-balance')}
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
        layout="wallet flex flex-col flex-grow justify-center items-center rounded overflow-hidden bg-slate-600 space-y-3"
        href="/wallets/{address}"
    >
        <Button type={0} bg="bg-cyan-500" layout="w-6 h-6 text-xl self-end mr-4 mt-4" onClick={(e) => (e.preventDefault(), removeWallet(privateKey))}>
            <MaterialSymbol name="close" />
        </Button>
        <Row name="address" layout="w-full px-8">
            <Button type={0} layout="py-1 pl-3 pr-2 w-full rounded-full bg-cyan-900 text-lg" onClick={(e) => (e.preventDefault(), copy(address))}>
                <span class="flex-1 overflow-hidden text-ellipsis text-xs">{address}</span>
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
            class="w-full px-8 text-sm border-b-2 border-transparent"
            on:click={(e) => e.stopPropagation()}
        >
            {#each tablist as tab, i (tab)}
                <Tab bind:group={selectedTab} name={tab} value={i}>
                    {$t(tab)}
                </Tab>
            {/each}
        </TabGroup>
        <Column name="tab-content" layout="w-full h-52 overflow-auto space-y-2 px-8 pb-4">
            {#if selectedTab}
                <Row name="nft-loading" justify={1} layout="w-full h-40 px-8 pb-">
                    {$t('wallet.loading-nft')}
                </Row>
            {:else}
                {#await tokens}
                    <Row name="tokens-loading" justify={1} layout="h-full">
                        {$t('wallet.loading-tokens')}
                    </Row>
                {:then tokens}
                    {#each tokens as token (token)}
                        {#if token}
                            {@const { balance, network, symbol } = token}
                            <Row name="token" grow={0} justify={3}>
                                <Row name="token-data" grow={0} shrink={0} layout="mr-3">
                                    <img src="/tokens/unknown.png" alt={symbol} class="w-10 rounded-xl mr-2" />
                                    <Column>
                                        <span class="font-semibold">
                                            {symbol}
                                        </span>
                                        <span class="text-xs">
                                            {$t(getNetworkName(network))}
                                        </span>
                                    </Column>
                                </Row>
                                <span class="truncate">
                                    {formatEther(balance)}
                                </span>
                            </Row>
                        {/if}
                    {/each}
                {/await}
            {/if}
        </Column>
    </Link>
{/if}