<script lang="ts">
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { t } from '$lib/i18n';
    import { copy, replacer } from '$lib/util';
    import { toastMessage } from '$lib/util/toast';
    import { hash } from '$lib/util/client/users';
    import { currentUser } from '$lib/util/client/user';
    import { clients, wallets } from '$lib/util/client/wallets';
    import { NETWORKS, decrypt, getNetworkCurrency, getNetworkFile, getNetworkFiles, getNetworkName, getNetworkNames } from '$lib/util/wallets';
    import { Input, Button, Divider, MaterialSymbol, Modal, Textarea, Toggle } from '$lib/components';
    import { Row, Column } from '$lib/components/layout';
    import Wallet from './Wallet.svelte';

    export let compact: 0 | 1 = 0;
    export let dashboard: 0 | 1 = 0;

    const toastStore = getToastStore();

    let exportPassword = '';
    let exportKeys = '';
    let exportShown = false;
    let exportKeysShown = false;
    let networksShown = false;

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

    function toggleNetwork(network: number) {
        if (!$currentUser) return;

        $currentUser.networks ^= network;
    }

    function onClick(e: MouseEvent) {
        const target = e.target as Element;

        if (!target.closest('.networks')) {
            networksShown = false;
        }
    }
</script>

<svelte:window on:click={onClick} />

{#if $currentUser?.wallets.length}
    <Column name="wallets" layout="h-full">
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
                <Row name="networks" layout="!block h-full w-64 relative mr-2">
                    <Button type={2} layout="!justify-start h-full w-full {dashboard ? 'py-0 px-2 bg-slate-700' : ''} rounded truncate {border}" onClick={() => networksShown = !networksShown}>

                        {#if $currentUser.networks}
                            {@const networks = getNetworkNames($currentUser.networks)}
                            {@const networkFiles = getNetworkFiles($currentUser.networks)}

                            <Row name="networks-logo" grow={0} shrink={0} layout="-space-x-2">
                                {#each networkFiles.slice(0, 2) as networkFile (networkFile)}
                                    <img src={networkFile} alt={networkFile.slice(4)} class="{dashboard ? 'w-4 h-4' : 'w-6 h-6'} rounded-full flex-shrink-0" />
                                {/each}
                                {#if networks.length > 2}
                                    <Row name="networks-more" justify={1} layout="{dashboard ? 'w-4 h-4' : 'w-6 h-6'} rounded-full text-xs bg-slate-700">
                                        {networks.length - 2}+
                                    </Row>
                                {/if}
                            </Row>
                            <span class="truncate">
                                {#if networks.length === 1}
                                    {$t(networks[0])}
                                {:else}
                                    {replacer($t('networks.networks-active'), '{x}', networks.length)}
                                {/if}
                            </span>
                        {:else}
                            <span class="truncate">
                                {$t('networks.networks-none')}
                            </span>
                        {/if}

                    </Button>
                    <Column name="networks-list" layout="fixed {networksShown ? '' : 'hidden'} rounded bg-slate-900 w-64 z-10 overflow-hidden mt-2">
                        {#each Object.keys(NETWORKS) as key (key)}
                            {@const network = NETWORKS[key]}
                            <Toggle onChange={() => toggleNetwork(network)} checked={!!($currentUser.networks & network)} labelClass="network flex w-full items-center px-4 py-3 hover:bg-white/10">
                                <img src={getNetworkFile(network)} alt={getNetworkName(network)} class="w-6 rounded" />
                                <span class="truncate mx-2 flex-grow">
                                    {$t(getNetworkName(network))}
                                </span>
                            </Toggle>
                        {/each}
                    </Column>
                </Row>
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
                        <Button
                            onClick={() => {}}
                            type={0}
                            layout={mini}
                        >
                            <MaterialSymbol name="settings" />
                        </Button>
                    {/if}
                </Row>
            </Row>
        </Row>
        <Column name="scroller" layout="overflow-auto rounded bg-slate-700">
            {@const isCompact = compact
                ? 'flex-col gap-2 p-2'
                : 'grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'}
            <Column name="wallet-list" layout={isCompact} shrink={0} grow={0}>
                {#if compact}
                    <Row
                        name="wallet-header"
                        grow={0}
                        shrink={0}
                        layout="py-2 pl-4 pr-2 rounded bg-slate-600"
                    >
                        <Row name="address" grow={0} layout="w-2/5">
                            <span class="flex-1 overflow-hidden text-ellipsis">{$t('wallet.address')}</span>
                        </Row>
                        <Divider vr={1} spacing="mx-3" />
                        <Row name="balance" layout="h-full whitespace-nowrap overflow-hidden">
                            {#each Object.values($clients).map(client => client.chain) as chain, index (chain)}
                                {#if index !== 0}
                                    <Divider vr={1} spacing="mx-3" />
                                {/if}
                                <span class="flex-1 text-center truncate">
                                    {getNetworkCurrency(chain?.name) || $t('wallet.currency-unknown')}
                                </span>
                            {/each}
                        </Row>
                        <Row name="empty" grow={0} layout="w-6 flex-shrink-0" />
                    </Row>
                {/if}
                {#each $wallets as wallet (wallet)}
                    <Wallet client={wallet} {compact} />
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
