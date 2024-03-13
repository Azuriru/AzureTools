
<script lang="ts">
    import { formatEther, walletActions, type Hex } from 'viem';
    import type { PageData } from './$types';
    import { t } from '$lib/i18n';
    import { getNetworkName, type Network } from '$lib/util/wallets';
    import { tokenCache } from '$lib/util/client/cache';
    import { currentUser } from '$lib/util/client/user';
    import { Column, Row } from '$lib/components/layout';
    import { Divider, Toggle, Truncate } from '$lib/components';
    import { wallets, clients } from '$lib/util/client/wallets';
    import type { WalletInterface } from '$lib/util/client/wallet';

    export let data: PageData;

    $: token = $tokenCache[data.slug];

    async function getBalance(wallet: WalletInterface, network: Network, address: string) {
        const currentNetwork = $clients[network];

        if (currentNetwork) {
            return wallet.getBalance(currentNetwork, address as Hex);
        }

        return null;
    }
</script>

{#if token}
    {#await token then token}
        {@const { name, network, symbol } = token}
        <Column name="token" layout="bg-slate-700 rounded gap-2 px-4 md:px-10 py-6 h-full">
            <Column grow={0} align={1} layout="md:flex-row md:h-40 mb-8 px-4">
                <img src="/tokens/unknown.png" alt={name} class="rounded-xl h-full w-28 mb-4 md:mr-8" />
                <Column name="token-metadata" layout="min-w-0 w-full text-center">
                    <Truncate layout="font-semibold text-xl md:text-3xl mb-1">{name} ({symbol})</Truncate>
                    <Truncate layout="md:text-xl">{$t(getNetworkName(network))}</Truncate>
                </Column>
            </Column>
            <Row grow={0} layout="min-w-0">
                <Truncate>Show in wallets</Truncate>
                <Toggle checked={false} labelClass="ml-4" />
            </Row>
            <Divider spacing="my-2" />
            <Row grow={0} layout="min-w-0 mb-8">
                <Truncate>Enable this token</Truncate>
                <Toggle checked={false} labelClass="ml-4" />
            </Row>
            <Column name="wallets" grow={0} layout="min-w-0 w-full">
                <span class="text-xl font-semibold mb-4">Wallets</span>
                {#each $wallets as wallet, index (wallet)}
                    {#if index !== 0}
                        <Divider spacing="my-3" />
                    {/if}
                    <Row name="wallet" layout="whitespace-nowrap">
                        <Truncate>
                            {wallet.address}
                        </Truncate>
                        <span class="ml-4">
                            {#await getBalance(wallet, network, data.slug)}
                                Loading...
                            {:then balance}
                                {#if balance !== null}
                                    {formatEther(balance)} {symbol}
                                {/if}
                            {/await}
                        </span>
                    </Row>
                {/each}
            </Column>
        </Column>
    {/await}
{:else}
    <Column name="token" align={1} justify={1} layout="bg-slate-700 rounded h-full text-xl">
        404: Token not found
    </Column>
{/if}