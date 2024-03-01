<script lang="ts">
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { t } from '$lib/i18n';
    import { copy } from '$lib/util';
    import { toastMessage } from '$lib/util/toast';
    import { currentUser, hash } from '$lib/util/users';
    import { decrypt } from '$lib/util/wallets';
    import { Input, Button, Divider, MaterialSymbol, Modal, Textarea } from '$lib/components';
    import { Row, Column } from '$lib/components/layout';
    import { Wallet } from '$lib/components/client';

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

{#if $currentUser?.wallets.length}
    <Column name="wallets" layout="h-full">
        {@const mini = dashboard ? 'text-2xl' : 'text-3xl w-12 h-12'}
        {@const border = dashboard ? '' : 'rounded border-2 border-slate-600'}
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
                {/if}
                <Button
                    onClick={() => (compact = 1)}
                    type={0}
                    bg=""
                    layout={mini}
                >
                    <MaterialSymbol
                        name={dashboard ? 'table_rows' : 'menu'}
                        fill={dashboard}
                    />
                </Button>
                {#if !dashboard}
                    <Divider vr={1} color="border-slate-600" spacing="" />
                {/if}
                <Button
                    onClick={() => (compact = 0)}
                    type={0}
                    bg=""
                    layout={mini}
                >
                    <MaterialSymbol name="grid_view" fill={dashboard} />
                </Button>
            </Row>
        </Row>
        <Column name="scroller" layout="overflow-auto rounded bg-slate-700">
            {@const isCompact = compact
                ? 'flex-col gap-2 p-2'
                : `grid ${
                    dashboard
                        ? 'grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
                } gap-4 p-4`}
            <Column name="wallet-list" layout={isCompact} shrink={0} grow={0}>
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
                        <Row
                            name="balance"
                            layout="h-full whitespace-nowrap overflow-hidden"
                        >
                            <span class="flex-1 text-center">BNB</span>
                            <Divider vr={1} spacing="mx-3" />
                            <span class="flex-1 text-center text-ellipsis overflow-hidden">USDT</span>
                        </Row>
                        <Row name="empty" grow={0} layout="w-6 flex-shrink-0" />
                    </Row>
                {/if}
                {#each $currentUser.wallets as address (address)}
                    <Wallet privateKey={decrypt(address, $currentUser.password)} {dashboard} {compact} />
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

<Modal bind:shown={exportShown} title={$t('wallets.export')}>
    <Input
        bind:value={exportPassword}
        labelClass="text-sm flex-col font-semibold mb-4"
        class="mt-2 font-normal"
        placeholder={$t('wallets.export-prompt-placeholder')}
    >
        {$t('wallets.export-prompt')}
    </Input>
    <Button onClick={onExport}>{$t('wallets.export')}</Button>
</Modal>

<Modal bind:shown={exportKeysShown} title={$t('wallets.export')}>
    <Textarea
        labelClass="flex-col text-sm font-semibold mb-4"
        class="mt-2 font-normal"
        bind:value={exportKeys}
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
