<script lang="ts">
    import type { Hex } from 'viem';
    import { privateKeyToAccount } from 'viem/accounts';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { startsWith } from '$lib/util';
    import { t } from '$lib/i18n';
    import { toastMessage } from '$lib/util/toast';
    import { wallets } from '$lib/util/wallets';
    import { MaterialSymbol, Button, Textarea, Modal } from '$lib/components';

    let privateKeyModalShown = false;
    let privateKeyValue = '';

    const toastStore = getToastStore();

    async function onSubmit() {
        if (!privateKeyValue.trim()) {
            toastStore.trigger(toastMessage('wallets.import-all-error-empty'));
            privateKeyModalShown = false;
            return;
        }

        let privateKeys = privateKeyValue.trim().split('\n');
        let importErrors = privateKeys.length;
        let importDuplicates = 0;

        for (let privateKey of privateKeys) {
            if (!startsWith(privateKey, '0x')) {
                privateKey = `0x${privateKey}`;
            }

            try {
                if ($wallets.import(privateKeyToAccount(privateKey as Hex).address)) {
                    importErrors--;
                } else {
                    importDuplicates++;
                }
            } catch(e) { /* viem can go fuck itself */ }
        }

        if (!importErrors) {
            toastStore.trigger(toastMessage('wallets.import-all-success'));
        } else if (importErrors < privateKeys.length) {
            toastStore.trigger(toastMessage('wallets.import-all-warn-generic'));
        } else {
            toastStore.trigger(toastMessage('wallets.import-all-error-fail'));
        }

        if (importDuplicates) {
            toastStore.trigger(toastMessage('wallets.import-all-warn-duplicates'));
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

<Modal title={$t('wallets.manage')} shown={privateKeyModalShown}>
    <Textarea
        bind:value={privateKeyValue}
        class="mb-4"
        rows={6}
        placeholder={$t('wallets.import-placeholder')}
        label={$t('wallets.import-label')}
    />
    <Button onClick={onSubmit}>
        {$t('wallets.import')}
    </Button>
</Modal>