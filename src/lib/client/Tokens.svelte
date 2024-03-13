<script lang="ts">
    import { t } from '$lib/i18n';
    import { getNetworkName } from '$lib/util/wallets';
    import { filterTokenByNetworks, getNetworkTokens } from '$lib/util/tokens';
    import { tokenCache } from '$lib/util/client/cache';
    import { currentUser } from '$lib/util/client/user';
    import { Column, Row } from '$lib/components/layout';
    import { Input, Link, MaterialSymbol } from '$lib/components';
    import ImportTokens from './ImportTokens.svelte';

    export let dashboard: 0 | 1 = 0;

    $: currentTokens = $currentUser
        ? [...getNetworkTokens($currentUser.networks), ...filterTokenByNetworks($currentUser.tokens, $currentUser.networks)]
        : [];
    $: tokens = currentTokens.map(async ({ address }) => ({
        address,
        ...await $tokenCache[address]
    }));
</script>

<Column name="tokens" layout="relative h-full">
    <Row name="token-settings" justify={3} grow={0} layout="mb-2">
        {@const mini = dashboard ? 'text-2xl' : 'text-3xl w-12 h-12'}
        {@const border = dashboard ? '' : 'rounded border-2 border-solid border-slate-600'}

        <Input
            size={1}
            class="[&:not(:focus)]:p-0 w-0 focus:w-full {dashboard
                ? '!p-0'
                : ''}"
            labelClass="search rounded {border} {dashboard
                ? 'has-[:focus]:bg-slate-700'
                : ''} has-[:focus]:flex-grow transition-all overflow-hidden"
            background=""
        >
            <Row
                grow={0}
                shrink={0}
                justify={1}
                layout="flex-shrink-0 {mini} pointer-events-none"
            >
                <MaterialSymbol name="search" />
            </Row>
        </Input>
    </Row>
    <Column name="token-list" layout="bg-slate-700 rounded gap-2 p-2 h-full overflow-auto">
        {#each tokens as token (token)}
            <Row name="token" grow={0} shrink={0} layout="bg-slate-600 rounded px-2 py-1 h-12">
                {#await token}
                    <Row justify={1} layout="order-1">
                        {$t('token.loading-data')}
                    </Row>
                {:then { name, symbol, network, address }}
                    <Link href="/tokens/{address}" layout="flex flex-grow">
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
                    </Link>
                {/await}
            </Row>
        {/each}
    </Column>
    <ImportTokens />
</Column>
