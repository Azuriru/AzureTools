
<script lang="ts">
    import { formatEther, type Hex } from 'viem';
    import type { PageData } from './$types';
    import { t } from '$lib/i18n';
    import { getNetworkName, type Network } from '$lib/util/wallets';
    import { tokenCache } from '$lib/util/client/cache';
    import { type WalletInterface } from '$lib/util/client/wallet';
    import { wallets, clients } from '$lib/util/client/wallets';
    import { currentUser } from '$lib/util/client/user';
    import { Column, Row } from '$lib/components/layout';
    import { Divider, Link, MaterialSymbol, Toggle, Truncate } from '$lib/components';

    export let data: PageData;

    async function getBalance(wallet: WalletInterface, network: Network, address: string) {
        const currentNetwork = $clients[network];

        if (currentNetwork) {
            return wallet.getBalance(currentNetwork, address as Hex);
        }

        return null;
    }


    function toggleVisibility() {
        if (!$currentUser) return;

        if (isVisible) {
            $currentUser.settings.tokens.visibility[data.slug] = false;
        } else {
            $currentUser.settings.tokens.visibility[data.slug] = true;
        }

        $currentUser.settings = $currentUser.settings;
    }

    function toggleDisability() {
        if (!$currentUser) return;

        if (isDisabled) {
            $currentUser.settings.tokens.disabled[data.slug] = false;
        } else {
            $currentUser.settings.tokens.disabled[data.slug] = true;
        }

        $currentUser.settings = $currentUser.settings;
    }

    $: isVisible = $currentUser?.settings.tokens.visibility[data.slug];
    $: isDisabled = $currentUser?.settings.tokens.disabled[data.slug];
</script>

<Column name="token" layout="bg-slate-700 rounded gap-2 px-4 md:px-10 py-6 h-full">
    <Row grow={0} layout="mb-6">
        <Link href="/tokens" layout="flex p-2 flex-shrink-0 justify-center items-center rounded-full bg-slate-600 text-3xl w-10 h-10 mr-4">
            <MaterialSymbol name="chevron_left" />
        </Link>
        <Truncate layout="text-3xl font-medium">
            Token Info
        </Truncate>
    </Row>
    {#if $tokenCache[data.slug] && $currentUser}
        {#await $tokenCache[data.slug]}
            <Row name="token-loading"align={1} justify={1} layout="h-full">
                Loading token...
            </Row>
        {:then token}
            {@const { name, network, symbol } = token}
            <Column name="token-info" grow={0} align={1} layout="md:flex-row md:h-40 mb-8 px-4 md:px-0">
                <img src="/tokens/unknown.png" alt={name} class="token-image rounded-xl h-full w-28 md:w-auto mb-4 md:mb-0 md:mr-12" />
                <Column name="token-metadata" layout="min-w-0 w-full text-center md:text-left">
                    <Truncate layout="font-semibold text-xl md:text-3xl mb-1">{name} ({symbol})</Truncate>
                    <Truncate layout="md:text-xl">{$t(getNetworkName(network))}</Truncate>
                </Column>
            </Column>
            <Row grow={0} layout="min-w-0">
                <Truncate>Show in wallets</Truncate>
                <Toggle checked={!!isVisible} labelClass="ml-4" onChange={toggleVisibility}  />
            </Row>
            <Divider spacing="my-2" />
            <Row grow={0} layout="min-w-0 mb-8">
                <Truncate>Enable this token</Truncate>
                <Toggle checked={!!isDisabled} labelClass="ml-4" onChange={toggleDisability} />
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
        {/await}
    {:else}
        <Column name="token" align={1} justify={1} layout="h-full text-xl">
            No such token exists
        </Column>
    {/if}
</Column>