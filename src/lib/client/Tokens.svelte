<script lang="ts">
    import { t } from '$lib/i18n';
    import { getNetworkFiles, getNetworkName, getNetworkNames } from '$lib/util/wallets';
    import { getNetworkTokens } from '$lib/util/tokens';
    import { tokenCache } from '$lib/util/client/cache';
    import { currentUser } from '$lib/util/client/user';
    import { Column, Row } from '$lib/components/layout';
    import { replacer } from '$lib/util';

    $: currentTokens = $currentUser ? getNetworkTokens($currentUser.networks) : [];
    $: tokens = currentTokens.map(async ({ address }) => ({
        ...await $tokenCache[address]
    }));
</script>


<!-- {#if $currentUser?.networks}
    {@const networks = getNetworkNames($currentUser.networks)}
    {@const networkFiles = getNetworkFiles($currentUser.networks)}

    <Row name="networks-logo" grow={0} shrink={0} layout="-space-x-2">
        {#each networkFiles.slice(0, 2) as networkFile (networkFile)}
            <img src={networkFile} alt={networkFile.slice(4)} class="w-6 h-6 rounded-full flex-shrink-0" />
        {/each}
        {#if networks.length > 2}
            <Row name="networks-more" justify={1} layout="w-6 h-6 rounded-full text-xs bg-slate-700">
                {networks.length - 2}+
            </Row>
        {/if}
    </Row>
    <span class="truncate">
        {#if networks.length === 1}
            {$t(networks[0])}
        {:else}
            {replacer($t('networks.networks-active'), '{x}', networks.length)}
        {/if}
    </span>
{:else}
    <span class="truncate">
        {$t('networks.networks-none')}
    </span>
{/if} -->

<Column name="tokens" layout="h-full bg-slate-700 rounded gap-2 p-2">
    {#each tokens as token (token)}
        <Row name="token" grow={0} shrink={0} layout="bg-slate-600 rounded px-2 py-1 h-12">
            {#await token}
                <Row justify={1} layout="order-1">
                    {$t('token.loading-data')}
                </Row>
            {:then { name, symbol, network }}
                <img src="/tokens/unknown.png" alt={symbol} class="w-10 rounded-xl mr-2" />
                <Column layout="min-w-0">
                    <span class="font-semibold truncate">
                        {name}
                    </span>
                    <span class="text-xs truncate">
                        {$t(getNetworkName(network))}
                    </span>
                </Column>
                <Row grow={0}>
                    {symbol}
                </Row>
            {/await}
        </Row>
    {/each}
</Column>
