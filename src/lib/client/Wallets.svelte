<script lang="ts">
    import { t } from '$lib/i18n';
    import { wallets } from '$lib/util/wallets';
    import { Row, Column } from '$lib/components/layout';
    import { Wallet } from '$lib/components/client';
    import { Input, Button, Divider, MaterialSymbol } from '$lib/components';

    export let compact: 0 | 1 = 0;
    export let dashboard: 0 | 1 = 0;
</script>

<!-- Todo make a third compact grid??? -->
{#if $wallets.state.length}
    <Column name="wallets" layout="h-full">
        {@const mini = dashboard ? 'text-2xl' : 'text-3xl w-12 h-12'}
        {@const border = dashboard ? '' : 'rounded border-2 border-slate-600'}
        <Row
            name="controls"
            justify={3}
            grow={0}
            layout="mb-2"
        >
            <Input
                size={1}
                class="[&:not(:focus)]:p-0 w-0 focus:w-full {dashboard ? '!p-0' : ''}"
                labelClass="search rounded {border} {dashboard ? 'has-[:focus]:bg-slate-700' : ''} has-[:focus]:flex-grow transition-all has-[:focus]:mr-2 overflow-hidden"
                background=""
            >
                <Row grow={0} shrink={0} justify={1} layout="flex-shrink-0 {mini} pointer-events-none">
                    <MaterialSymbol name="search" />
                </Row>
            </Input>
            <Row name="view" grow={0} layout="h-full rounded {border}">
                <Button onClick={() => compact = 1} type={0} bg="" layout={mini}>
                    <MaterialSymbol name={dashboard ? 'table_rows' : 'menu'} fill={dashboard} />
                </Button>
                {#if !dashboard}
                    <Divider vr={1} color="border-slate-600" spacing="" />
                {/if}
                <Button onClick={() => compact = 0} type={0} bg="" layout={mini}>
                    <MaterialSymbol name="grid_view" fill={dashboard} />
                </Button>
            </Row>
        </Row>
        <Column name="scroller" layout="overflow-auto rounded bg-slate-700">
            {@const isCompact = compact
                ? 'flex-col gap-2 p-2'
                : `grid ${dashboard ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'} gap-4 p-4` }
            <Column
                name="wallet-list"
                layout={isCompact}
                shrink={0}
            >
                {#if compact}
                    <Row
                        name="wallet-header"
                        grow={0}
                        shrink={0}
                        layout="py-2 px-4 rounded bg-slate-600"
                    >
                        <Row name="address" grow={0} layout="w-2/5">
                            <span class="flex-1 overflow-hidden text-ellipsis">Address</span>
                        </Row>
                        <Divider vr={1} spacing="mx-3" />
                        <Row name="balance" layout="h-full whitespace-nowrap overflow-hidden">
                            <span class="flex-1 text-center">
                                BNB
                            </span>
                            <Divider vr={1} spacing="mx-3" />
                            <span class="flex-1 text-center text-ellipsis overflow-hidden">
                                USDT
                            </span>
                        </Row>
                        <Row name="empty" grow={0} layout="w-6 flex-shrink-0" />
                    </Row>
                {/if}
                {#each $wallets.state as address (address)}
                    <Wallet {address} {dashboard} {compact} />
                {/each}
            </Column>
        </Column>
    </Column>
{:else}
    <Row
        name="wallets"
        shrink={0}
        align={1}
        justify={1}
        layout="h-full bg-slate-700 rounded p-4 text-center"
    >
        {$t('wallets.empty')}
    </Row>
{/if}