<script lang="ts">
    import { t } from '$lib/i18n';
    import { wallets } from '$lib/util/wallets';
    import { Row, Column } from '$lib/components/layout';
    import { Wallet } from '$lib/components/client';
    import { Divider } from '$lib/components';

    export let compact: 0 | 1 = 0;
</script>

{#if $wallets.state.length}
    {#if compact}
        <Column
            name="wallets"
            shrink={0}
            layout="bg-slate-700 rounded gap-2 p-2"
        >

            <Row
                name="wallet"
                shrink={1}
                layout="py-2 px-4 rounded overflow-hidden bg-slate-600"
            >
                <Row name="address" grow={0} layout="w-2/5">
                    <span class="flex-1 overflow-hidden text-ellipsis text-xs">Address</span>
                </Row>
                <Divider vertical={1} spacing="mx-3" />
                <Row name="balance" layout="h-full whitespace-nowrap overflow-hidden">
                    <span class="flex-1 text-center">
                        BNB
                    </span>
                    <Divider vertical={1} spacing="mx-3" />
                    <span class="flex-1 text-center text-ellipsis overflow-hidden">
                        USDT
                    </span>
                </Row>
                <Row name="empty" grow={0} layout="w-6 flex-shrink-0" />
            </Row>
            {#each $wallets.state as address (address)}
                <Wallet {address} {compact} />
            {/each}
        </Column>
    {:else}
        <Row
            name="wallets"
            shrink={0}
            align={0}
            justify={5}
            layout="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 bg-slate-700 rounded gap-4 p-4"
        >
            {#each $wallets.state as address (address)}
                <Wallet {address} />
            {/each}
        </Row>
    {/if}
{:else}
    <Row
        name="wallets"
        shrink={0}
        align={1}
        justify={1}
        layout="h-32 bg-slate-700 rounded p-4"
    >
        {$t('wallets.empty')}
    </Row>
{/if}