<script lang="ts">
    import { t } from '$lib/i18n';
    import { getNetworkName } from '$lib/util/wallets';
    import { filterTokenByNetworks, getNetworkTokens } from '$lib/util/tokens';
    import { tokenCache } from '$lib/util/client/cache';
    import { currentUser } from '$lib/util/client/user';
    import { Column, Row } from '$lib/components/layout';
    import { Button, Divider, Input, Link, MaterialSymbol, Toggle } from '$lib/components';

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
    <Row name="token-settings" justify={0} grow={0} layout="mb-2">
        {@const mini = dashboard ? 'text-2xl' : 'text-3xl w-12 h-12'}
        {@const border = dashboard ? '' : 'rounded border-2 border-solid border-slate-600'}

        <Row name="settings" grow={0} layout="h-full rounded {border} mr-2">
            <Link href="/tokens" layout="flex justify-center items-center {mini}">
                <MaterialSymbol name="chevron_left" fill={dashboard} />
            </Link>
        </Row>
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
        <Row name="token" grow={0} shrink={0} layout="bg-slate-600 rounded px-2 py-1 h-12">
            <Column layout="ml-12 min-w-0 w-1/3">
                <span class="font-semibold truncate">
                    Token Name
                </span>
            </Column>
            <Divider vr={1} spacing="mx-2" />
            <Row grow={0} shrink={0} justify={1} layout="font-semibold w-40">
                Show in wallets
            </Row>
            <Divider vr={1} spacing="mx-2" />
            <Button type={0} layout="flex-shrink-0 w-20 h-10">
                Visiblity
            </Button>
        </Row>

        {#each tokens as token (token)}
            <Row name="token" grow={0} shrink={0} layout="bg-slate-600 rounded px-2 py-1 h-12">
                {#await token}
                    <Row justify={1} layout="order-1">
                        {$t('token.loading-data')}
                    </Row>
                {:then { name, symbol, network }}
                    <img src="/tokens/unknown.png" alt={symbol} class="w-10 rounded-xl mr-2" />
                    <Column layout="min-w-0 w-1/3">
                        <span class="font-semibold truncate">
                            {name}
                        </span>
                        <span class="text-xs truncate">
                            {$t(getNetworkName(network))}
                        </span>
                    </Column>
                    <Divider vr={1} spacing="mx-2" />
                    <Toggle checked={false} labelClass="px-2 w-1/3 flex justify-center flex-shrink-0" />
                    <Divider vr={1} spacing="mx-2" />
                    <Button type={0} layout="text-2xl w-1/3 h-10 flex-shrink-0">
                        <MaterialSymbol name="visibility" />
                    </Button>
                {/await}
            </Row>
        {/each}
    </Column>
</Column>
