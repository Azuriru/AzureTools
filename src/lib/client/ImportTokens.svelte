<script lang="ts">
    import { createPublicClient, http, type Hex } from 'viem';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { t } from '$lib/i18n';
    import { startsWith } from '$lib/util';
    import { toastMessage } from '$lib/util/toast';
    import { readContract, getNetworkNames, getNetworks, getChain, getNetworkRPC, NETWORKS_ALL, type Network } from '$lib/util/wallets';
    import { addToken, currentUser } from '$lib/util/client/user';
    import { MaterialSymbol, Button, Modal, Input, Dropdown } from '$lib/components';
    import { Row } from '$lib/components/layout';
    import { findDuplicateToken, getNetworkTokens } from '$lib/util/tokens';

    const toastStore = getToastStore();
    const options = ['tokens.import-network-placeholder', ...getNetworkNames(NETWORKS_ALL)];

    let tokenModalShown = false;
    let tokenAddress = '';
    let tokenNetwork: 0 | Network = 0;
    let tokenSymbol = '';
    let tokenDecimal = '';
    let tokenImportDisabled = true;

    $: network = [0, ...getNetworks(NETWORKS_ALL)][tokenNetwork] as 0 | Network;
    $: (async () => {
        if (tokenNetwork !== 0) {
            updateSymbol('');
            updateDecimals('');

            if (!tokenAddress) return;
            if (!startsWith(tokenAddress, '0x')) {
                return toastStore.trigger(toastMessage('tokens.import-error-invalid'));
            }

            const client = createPublicClient({
                chain: getChain(network as Network),
                transport: http(getNetworkRPC(network as Network))
            });

            const symbol = await readContract<string>(client, tokenAddress as Hex, 'symbol');
            updateSymbol(symbol || '');

            const decimals = await readContract<string>(client, tokenAddress as Hex, 'decimals');
            updateDecimals(decimals || '');

            if (!symbol || !decimals) {
                toastStore.trigger(toastMessage('tokens.import-error-generic'));
            }
        }
    })();

    $: tokenImportDisabled = !(tokenSymbol && tokenDecimal);

    function updateSymbol(symbol: string) {
        tokenSymbol = symbol;
    }

    function updateDecimals(decimal: string) {
        tokenDecimal = decimal;
    }

    async function onImport() {
        if (!tokenAddress.trim() || tokenNetwork === 0 || !tokenSymbol.trim() || !tokenDecimal) {
            return toastStore.trigger(toastMessage('tokens.import-error-empty'));
        }

        if (!startsWith(tokenAddress, '0x')) {
            return toastStore.trigger(toastMessage('tokens.import-error-invalid'));
        }

        if (findDuplicateToken(tokenAddress as Hex, getNetworkTokens(NETWORKS_ALL)) ||
            $currentUser && findDuplicateToken(tokenAddress as Hex, $currentUser.tokens)) {
            return toastStore.trigger(toastMessage('tokens.import-error-duplicate'));
        }

        addToken({
            address: tokenAddress as Hex,
            network: network as Network
        });
        tokenModalShown = false;
    }

    function onDestroy() {
        tokenAddress = '';
        tokenNetwork = 0;
        tokenSymbol = '';
        tokenDecimal = '';
        tokenImportDisabled = true;
    }
</script>

<Button
    type={0}
    bg="bg-cyan-500"
    layout="w-16 h-16 absolute bottom-8 right-8 z-10 shadow-xl rounded-full text-5xl"
    onClick={() => tokenModalShown = !tokenModalShown}
>
    <MaterialSymbol name="add" />
</Button>

<Modal title={$t('tokens.import-token')} bind:shown={tokenModalShown} {onDestroy}>
    <Input
        bind:value={tokenAddress}
        labelClass="flex-col font-semibold mb-4"
        class="mt-2 font-normal"
        placeholder={$t('tokens.import-contract-placeholder')}
    >
        {$t('tokens.import-contract-label')}
    </Input>
    <Dropdown
        width="w-full"
        dropdownClass="flex-col font-semibold mb-4"
        spacing="mt-2 font-normal"
        options={options.map(key => $t(key))}
        bind:selectedOption={tokenNetwork}
    >
        {$t('tokens.import-network-label')}
    </Dropdown>
    <Row layout="space-x-3 mb-4">
        <Input
            bind:value={tokenSymbol}
            labelClass="flex-col font-semibold"
            class="w-full mt-2 font-normal"
            placeholder={$t('tokens.import-symbol-placeholder')}
            disabled={true}
        >
            {$t('tokens.import-symbol-label')}
        </Input>
        <Input
            bind:value={tokenDecimal}
            labelClass="flex-col font-semibold"
            class="w-full mt-2 font-normal"
            placeholder={$t('tokens.import-decimal-placeholder')}
            disabled={true}
        >
            {$t('tokens.import-decimal-label')}
        </Input>
    </Row>
    <Button onClick={onImport} disabled={tokenImportDisabled}>
        {$t('generic.import')}
    </Button>
</Modal>