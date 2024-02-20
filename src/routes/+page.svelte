<script lang="ts">
    import type { Hex } from 'viem';
    import { privateKeyToAccount } from 'viem/accounts';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { startsWith } from '$lib/util';
    import { toastMessage } from '$lib/util/toast';
    import { wallets } from '$lib/util/wallets';
    import { Wallets } from '$lib/client';
    import { Button, MaterialSymbol, Modal } from '$lib/components';
    import { Row, Column } from '$lib/components/layout';
    import Textarea from '$lib/components/Textarea.svelte';

    let privateKeyModalShown = false;
    let privateKeyValue = '';

    const toastStore = getToastStore();

    async function onSubmit() {
        privateKeyModalShown = false;

        for (let privateKey of privateKeyValue.split('\n')) {
            if (!startsWith(privateKey, '0x')) {
                privateKey = `0x${privateKey}`;
            }

            try {
                const wallet = privateKeyToAccount(privateKey as Hex);
                $wallets.do({
                    type: 'add',
                    address: wallet.address
                });
                toastStore.trigger(toastMessage('import-success'));
            } catch(e) {
                toastStore.trigger(toastMessage('import-error'));
            }
        }

        privateKeyValue = '';
    }
</script>

<Column name="tools" layout="p-2 space-y-2 overflow-y-auto bg-slate-950">
    <Wallets />
    {#each new Array(4) as _, i (i)}
        <Row shrink={0} layout="h-96 bg-slate-700 rounded" />
    {/each}
    <Button
        type={0}
        layout="w-16 h-16 fixed bottom-8 right-8 z-10 shadow-xl rounded-full text-5xl"
        onClick={() => privateKeyModalShown = !privateKeyModalShown}
    >
        <MaterialSymbol name="add" />
    </Button>
</Column>

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