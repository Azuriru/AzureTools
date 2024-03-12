<script lang="ts">
    import { t } from '$lib/i18n';
    import { getNetworkFiles, getNetworkName, getNetworkNames } from '$lib/util/wallets';
    import { filterTokenByNetworks, getNetworkTokens } from '$lib/util/tokens';
    import { tokenCache } from '$lib/util/client/cache';
    import { currentUser } from '$lib/util/client/user';
    import { Column, Row } from '$lib/components/layout';
    import { replacer } from '$lib/util';
    import ImportTokens from './ImportTokens.svelte';

    export let dashboard: 0 | 1 = 0;

    $: currentTokens = $currentUser
        ? [...getNetworkTokens($currentUser.networks), ...filterTokenByNetworks($currentUser.tokens, $currentUser.networks)]
        : [];
    $: tokens = currentTokens.map(async ({ address }) => ({
        ...await $tokenCache[address]
    }));
</script>

<Column name="tokens" layout="relative h-full">
    <Row name="token-settings">
        arejflkmaew
    </Row>
    <Column name="token-list" layout="bg-slate-700 rounded gap-2 p-2 h-full overflow-auto">
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
    <ImportTokens />
</Column>
