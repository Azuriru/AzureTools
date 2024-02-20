<script lang="ts">
    import { wallets } from '$lib/util/wallets';
    import { getBalance, formatBalance } from '$lib/util/wallet';
    import { Row, Column } from '$lib/components/layout';
    import { Button, MaterialSymbol } from '$lib/components';
    import { Tab, TabGroup } from '@skeletonlabs/skeleton';

    let selectedTab = 0;

    const tablist = [
        'Tokens',
        'NFTs',
        'Activity'
    ];

// const tablist = [
    //     'wallet.tokens',
    //     'wallet.nfts',
    //     'wallet.activity'
    // ];
</script>


{#if $wallets.state.length}
    <Row
        name="wallets"
        shrink={0}
        align={0}
        justify={5}
        layout="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 bg-slate-700 rounded gap-4 p-4"
    >
        {#each $wallets.state as address (address)}
            <Column
                name="wallet"
                grow={1}
                shrink={1}
                justify={1}
                align={1}
                layout="px-8 py-4 rounded overflow-hidden bg-slate-600 space-y-3"
            >
                <Button type={0} layout="w-6 h-6 text-xl self-end">
                    <MaterialSymbol name="close" />
                </Button>
                <Column name="balance" align={1} layout="!mt-0 h-16">
                    {#await getBalance(address)}
                        <Row>
                            Loading balance...
                        </Row>
                    {:then { chain, usdt }}
                        <Row name="balance-chain" layout="text-3xl font-semibold mb-1">
                            {formatBalance(chain, 0)} BNB
                        </Row>
                        <Row name="balance-usdt" layout="">
                            ${formatBalance(usdt)} USDT
                        </Row>
                    {/await}
                </Column>
                <Row name="address" layout="w-full py-1 pl-3 pr-2 rounded-full bg-cyan-900">
                    <span class="flex-1 overflow-hidden text-ellipsis text-xs">{address}</span>
                    <Button type={0} bg="" layout="text-lg">
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
                        <Tab group={selectedTab} name={tab} value={i}>
                            {tab}
                        </Tab>
                    {/each}
                </TabGroup>
                <Column name="token-list" layout="w-full h-40 bg-cyan-800 justify-center items-center">
                    content for tabs here
                </Column>
            </Column>
        {/each}
    </Row>
{:else}
    <Row
        name="wallets"
        shrink={0}
        align={1}
        justify={1}
        layout="h-32 bg-slate-700 rounded p-4"
    >

        You don't seem to have any wallets, import some!
    </Row>
{/if}