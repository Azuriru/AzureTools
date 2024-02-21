<script lang="ts">
    import type { Hex } from 'viem';
    import { privateKeyToAccount } from 'viem/accounts';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { startsWith } from '$lib/util';
    import { toastMessage } from '$lib/util/toast';
    import { wallets } from '$lib/util/wallets';
    import { MaterialSymbol, Button, Textarea, Modal } from '$lib/components';

    let privateKeyModalShown = false;
    let privateKeyValue = '';

    const toastStore = getToastStore();

    async function onSubmit() {
        if (!privateKeyValue.trim()) {
            toastStore.trigger(toastMessage('import-error-empty'));
            privateKeyModalShown = false;
            return;
        }

        let privateKeys = privateKeyValue.trim().split('\n');
        let importErrors = privateKeys.length;

        for (let privateKey of privateKeys) {
            if (!startsWith(privateKey, '0x')) {
                privateKey = `0x${privateKey}`;
            }

            try {
                if ($wallets.import(privateKeyToAccount(privateKey as Hex).address)) {
                    importErrors--;
                }
            } catch(e) { /* viem can go fuck itself */ }
        }

        if (!importErrors) {
            toastStore.trigger(toastMessage('import-all-successful'));
        } else if (importErrors < privateKeys.length) {
            toastStore.trigger(toastMessage('import-all-error'));
        } else {
            toastStore.trigger(toastMessage('import-all-failed'));
        }

        privateKeyModalShown = false;
        privateKeyValue = '';
    }
</script>


<Button
    type={0}
    layout="w-16 h-16 fixed bottom-8 right-8 z-10 shadow-xl rounded-full text-5xl"
    onClick={() => privateKeyModalShown = !privateKeyModalShown}
>
    <MaterialSymbol name="add" />
</Button>

<Modal title="dashboard.import-private-key" shown={privateKeyModalShown}>
    <Textarea
        bind:value={privateKeyValue}
        class="mb-4"
        rows={6}
        placeholder="Add your private keys, each on a new line"
        label="Import Private Keys"
    />
    <Button onClick={onSubmit}>
        Import
    </Button>
</Modal>