<script lang="ts">
    import { t } from '$lib/i18n';
    import { wallets } from '$lib/util/wallets';
    import { Row, Column } from '$lib/components/layout';
    import { Wallet } from '$lib/components/client';
    import { Input, Button, Divider, MaterialSymbol } from '$lib/components';

    export let compact: 0 | 1 = 0;
</script>

{#if $wallets.state.length}
    <Row
        name="controls"
        justify={3}
        grow={0}
        layout="mb-2"
    >
        <!--  [&:not(:focus)]:w-0 -->
        <Input
            size={1}
            class="[&:not(:focus)]:p-0 w-0 focus:w-full"
            labelClass="search rounded border-2 border-slate-600 has-[:focus]:flex-grow transition-all has-[:focus]:mr-2 overflow-hidden"
            background=""
        >
            <Row grow={0} shrink={0} justify={1} layout="flex-shrink-0 text-3xl w-12 h-12 pointer-events-none">
                <MaterialSymbol name="search" />
            </Row>
        </Input>
        <Row name="view" grow={0} layout="h-full border-2 rounded border-slate-600">
            <Button onClick={() => compact = 1} type={0} bg="" layout="text-3xl w-12 h-12">
                <MaterialSymbol name="menu" />
            </Button>
            <Divider vr={1} color="border-slate-600" spacing="" />
            <Button onClick={() => compact = 0} type={0} bg="" layout="text-3xl w-12 h-12">
                <MaterialSymbol name="grid_view" />
            </Button>
        </Row>
    </Row>
    {#if compact}
        <Column
            name="wallets"
            shrink={0}
            layout="bg-slate-700 rounded gap-2 p-2"
        >

            <Row
                name="wallet"
                grow={0}
                shrink={1}
                layout="py-2 px-4 rounded overflow-hidden bg-slate-600"
            >
                <Row name="address" grow={0} layout="w-2/5">
                    <span class="flex-1 overflow-hidden text-ellipsis text-xs">Address</span>
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