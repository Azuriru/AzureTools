<script lang="ts">
    import { t } from '$lib/i18n';
    import { getNetworkName } from '$lib/util/wallets';
    import { getNetworkTokens } from '$lib/util/tokens';
    import { tokenCache } from '$lib/util/client/cache';
    import { currentUser } from '$lib/util/client/user';
    import { Column, Row } from '$lib/components/layout';

    const tokens = $currentUser ? getNetworkTokens($currentUser.networks) : [];

    // const x = tokens.map(({ network, address }) => ({
    //     ...$tokenCache[address]
    // }));
    // console.log(x);
    const x = $tokenCache['0xdAC17F958D2ee523a2206206994597C13D831ec7'];

    if (x) x.then(console.log);
</script>

<Column name="tokens" layout="h-full bg-slate-700 rounded">
    {#each tokens as token (token)}
        <!-- {#if token}
            {@const { network, address } = token}
            {@const { symbol } = tokenCache[address] }
            <Row name="token" grow={0} justify={3} layout="">
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
            </Row>
        {/if} -->
    {/each}
</Column>