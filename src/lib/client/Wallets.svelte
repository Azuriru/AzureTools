<script lang="ts">
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { t } from '$lib/i18n';
    import { copy } from '$lib/util';
    import { toastMessage } from '$lib/util/toast';
    import { hash } from '$lib/util/client/users';
    import { currentUser } from '$lib/util/client/user';
    import { clients, wallets } from '$lib/util/client/wallets';
    import { decrypt, getNetworkCurrency } from '$lib/util/wallets';
    import { Input, Button, Divider, MaterialSymbol, Modal, Textarea, Link, Truncate } from '$lib/components';
    import { Row, Column } from '$lib/components/layout';
    import Wallet from './Wallet.svelte';
    import ImportWallets from './ImportWallets.svelte';

    export let compact: 0 | 1 = 0;
    export let dashboard: 0 | 1 = 0;

    const toastStore = getToastStore();

    let exportPassword = '';
    let exportKeys = '';
    let exportShown = false;
    let exportKeysShown = false;

    function onExport() {
        if (!$currentUser) return;
        const { wallets, password } = $currentUser;

        if (!exportPassword.trim()) {
            return toastStore.trigger(toastMessage('wallets.export-error-empty'));
        }

        if (password !== hash(exportPassword.trim())) {
            return toastStore.trigger(toastMessage('wallets.export-error-incorrect'));
        }

        toastStore.trigger(toastMessage('wallets.export-success'));

        exportKeys = wallets
            .map(hash => decrypt(hash, password))
            .join('\n');
        exportPassword = '';
        exportKeysShown = true;
        exportShown = false;
    }
</script>

{#if $currentUser}
    <Column name="wallets" layout="h-full relative">
        {#if $currentUser.wallets.length}
            {@const mini = dashboard ? 'text-2xl' : 'text-3xl w-12 h-12'}
            {@const border = dashboard ? '' : 'rounded border-2 border-solid border-slate-600'}

            <Row name="controls" justify={3} grow={0} layout="mb-2">
                <Input
                    size={1}
                    class="[&:not(:focus)]:p-0 w-0 focus:w-full {dashboard
                        ? '!p-0'
                        : ''}"
                    labelClass="search rounded {border} {dashboard
                        ? 'has-[:focus]:bg-slate-700'
                        : ''} has-[:focus]:flex-grow transition-all has-[:focus]:mr-2 overflow-hidden"
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
                <Row grow={0} name="controls-right" layout="h-full">
                    <Row name="view" grow={0} layout="h-full rounded {border}">
                        <Button
                            onClick={() => (exportShown = true)}
                            type={0}
                            bg=""
                            layout={mini}
                        >
                            <MaterialSymbol name="upload_file" fill={dashboard} />
                        </Button>
                        {#if !dashboard}
                            <Divider vr={1} color="border-slate-600" spacing="" />
                            <Button
                                onClick={() => (compact = 1)}
                                type={0}
                                layout={mini}
                            >
                                <MaterialSymbol name="menu" />
                            </Button>
                            <Divider vr={1} color="border-slate-600" spacing="" />
                            <Button
                                onClick={() => (compact = 0)}
                                type={0}
                                layout={mini}
                            >
                                <MaterialSymbol name="grid_view" />
                            </Button>
                            <Divider vr={1} color="border-slate-600" spacing="" />
                            <Link href="/wallets/settings" layout="flex justify-center items-center {mini}">
                                <MaterialSymbol name="settings" />
                            </Link>
                        {/if}
                    </Row>
                </Row>
            </Row>

            <Column name="scroller" layout="rounded bg-slate-700 overflow-hidden {compact ? 'p-2' : ''}">
                {@const isCompact = compact
                    ? 'flex-col gap-2 overflow-auto rounded'
                    : 'grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'}
                <Column name="wallet-list" layout={isCompact} shrink={0} grow={compact}>
                    {#if compact}
                        <Row
                            name="wallet-header"
                            layout="min-w-min py-2 bg-slate-600 px-3"
                            grow={0}
                        >
                            <Row name="address" grow={0} layout="h-full w-60 sticky left-3 text-center bg-slate-600">
                                <Truncate layout="">
                                    {$t('wallet.address')}
                                </Truncate>
                                <Divider vr={1} spacing="mx-3" />
                            </Row>
                            <Row name="balance" layout="h-full">
                                {#each Object.values($clients).map(client => client.chain) as chain, index (chain)}
                                    {#if index !== 0}
                                        <Divider vr={1} spacing="mx-3" />
                                    {/if}
                                    <Truncate layout="w-20 flex-shrink-0 text-center">
                                        {getNetworkCurrency(chain?.name) || $t('wallet.currency-unknown')}
                                    </Truncate>
                                {/each}
                            </Row>
                        </Row>
                    {/if}

                    {#each $wallets as wallet (wallet)}
                        <Wallet client={wallet} {compact} />
                    {/each}
                </Column>
            </Column>
        {:else}
            <Row
                name="empty"
                shrink={0}
                align={1}
                justify={1}
                layout="h-full bg-slate-700 rounded p-4 text-center relative"
            >
                {$t('wallets.empty')}
            </Row>
        {/if}
        <ImportWallets />
    </Column>
{/if}

<Modal bind:shown={exportShown} title={$t('wallets.export-wallets')}>
    <Input
        bind:value={exportPassword}
        labelClass="text-sm flex-col font-semibold mb-4"
        class="mt-2 font-normal"
        placeholder={$t('wallets.export-prompt-placeholder')}
    >
        {$t('wallets.export-prompt-label')}
    </Input>
    <Button onClick={onExport}>{$t('generic.export')}</Button>
</Modal>

<Modal bind:shown={exportKeysShown} title={$t('generic.export')}>
    <Textarea
        bind:value={exportKeys}
        labelClass="flex-col text-sm font-semibold mb-4"
        class="mt-2 font-normal"
        placeholder={$t('wallets.export-placeholder')}
    >
        {$t('wallets.export-label')}
    </Textarea>
    <Row>
        <Button onClick={() => (exportKeysShown = false)}>{$t('generic.done')}</Button>
        <Button width="w-9 flex-shrink-0" layout="text-xl ml-2 px-0 h-9" onClick={() => copy(exportKeys)}>
            <MaterialSymbol name="content_copy" />
        </Button>
    </Row>
</Modal>
