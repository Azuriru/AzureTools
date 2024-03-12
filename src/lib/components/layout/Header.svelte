<script lang="ts">
    import { goto } from '$app/navigation';
    import { t } from '$lib/i18n';
    import { replacer } from '$lib/util';
    import { currentUser } from '$lib/util/client/user';
    import { NETWORKS, getNetworkFile, getNetworkFiles, getNetworkName, getNetworkNames } from '$lib/util/wallets';
    import { unsetUser } from '$lib/util/client/users';
    import Row from './Row.svelte';
    import Column from './Column.svelte';
    import Button from '../Button.svelte';
    import Toggle from '../Toggle.svelte';
    import MaterialSymbol from '../MaterialSymbol.svelte';

    let networksShown = false;

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

    function logout() {
        unsetUser();
        goto('/');
    }
</script>

<svelte:window on:click={onClick} />

<Row
    name="navbar"
    grow={0}
    shrink={0}
    justify={2}
    layout="w-full h-14 py-2 px-4 bg-slate-800"
>
    {#if $currentUser}
        <Row name="networks" grow={0} layout="!block h-full w-64 relative rounded border-2 border-solid border-slate-600">
            <Button type={2} layout="px-2 !justify-start h-full w-full rounded truncate" onClick={() => networksShown = !networksShown}>

                {#if $currentUser.networks}
                    {@const networks = getNetworkNames($currentUser.networks)}
                    {@const networkFiles = getNetworkFiles($currentUser.networks)}

                    <Row name="networks-logo" grow={0} shrink={0} layout="-space-x-2">
                        {#each networkFiles.slice(0, 2) as networkFile (networkFile)}
                            <img src={networkFile} alt={networkFile.slice(4)} class="w-6 h-6 rounded-full flex-shrink-0" />
                        {/each}

                        {#if networks.length > 2}
                            <Row name="networks-more" justify={1} layout="w-6 h-6 rounded-full text-xs bg-slate-700">
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
    {/if}
    <Button type={0} onClick={logout} layout="text-2xl w-14 h-14">
        <MaterialSymbol name="logout" />
    </Button>
</Row>