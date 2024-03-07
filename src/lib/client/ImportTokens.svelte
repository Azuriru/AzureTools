<script lang="ts">
    import type { Hex } from 'viem';
    import { privateKeyToAccount } from 'viem/accounts';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { t } from '$lib/i18n';
    import { startsWith } from '$lib/util';
    import { toastMessage } from '$lib/util/toast';
    import { addToken } from '$lib/util/client/user';
    import { MaterialSymbol, Button, Modal, Input, Dropdown } from '$lib/components';
    import { Row } from '$lib/components/layout';
    import { NETWORKS_ALL, getNetworkName, getNetworks, type Network } from '$lib/util/wallets';

    const toastStore = getToastStore();
    const networks = [0, ...getNetworks(NETWORKS_ALL)];
    const networkOptions = [
        'tokens.token-network-placeholder',
        ...networks.slice(1).map((v) => getNetworkName(v as Network))
    ].map(key => $t(key));

    let tokenModalShown = true;
    let tokenAddress = '';
    let tokenNetwork = 0;
    let tokenSymbol = '';
    let tokenDecimal = '';

    async function onImport() {
        if (!tokenAddress.trim() || tokenNetwork === 0 || !tokenSymbol.trim() || !tokenDecimal.trim()) {
            toastStore.trigger(toastMessage('tokens.import-error-empty'));
            tokenModalShown = false;
            return;
        }

        if (!startsWith(tokenAddress, '0x')) {
            toastStore.trigger(toastMessage('tokens.import-error-invalid-address'));
            tokenModalShown = false;
            return;
        }

        addToken({
            address: tokenAddress as Hex,
            symbol: tokenSymbol,
            network: networks[tokenNetwork] as Network
        });
        tokenModalShown = false;
    }

    function onDestroy() {
        tokenAddress = '';
        tokenSymbol = '';
        tokenDecimal = '';
    }
</script>

<Button
    type={0}
    bg="bg-cyan-500"
    layout="w-16 h-16 fixed bottom-8 right-8 z-10 shadow-xl rounded-full text-5xl"
    onClick={() => tokenModalShown = !tokenModalShown}
>
    <MaterialSymbol name="add" />
</Button>

<Modal title={$t('tokens.import')} bind:shown={tokenModalShown} {onDestroy}>
    <Input
        bind:value={tokenAddress}
        labelClass="flex-col font-semibold mb-4"
        class="mt-2 font-normal"
        placeholder={$t('tokens.token-contract')}
    >
        {$t('tokens.token-contract-label')}
    </Input>
    <Dropdown
        width="w-full"
        dropdownClass="flex-col font-semibold mb-4"
        spacing="mt-2 font-normal"
        options={networkOptions}
        bind:selectedOption={tokenNetwork}
    >
        {$t('tokens.token-network-label')}
    </Dropdown>
    <Row layout="space-x-3 mb-4">
        <Input
            bind:value={tokenSymbol}
            labelClass="flex-col font-semibold"
            class="w-full mt-2 font-normal"
            placeholder={$t('tokens.token-symbol')}
        >
            {$t('tokens.token-symbol-label')}
        </Input>
        <Input
            bind:value={tokenDecimal}
            labelClass="flex-col font-semibold"
            class="w-full mt-2 font-normal"
            placeholder={$t('tokens.token-decimal')}
            type="number"
        >
            {$t('tokens.token-decimal-label')}
        </Input>
    </Row>
    <Button onClick={onImport}>
        {$t('tokens.import')}
    </Button>
</Modal>