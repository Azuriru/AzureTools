<script lang="ts">
    import { Button, Input, MaterialSymbol, Modal } from '$lib/components';
    import { Row, Column } from '$lib/components/layout';
    import { privateKeyToAccount } from 'viem/accounts';
    import { writable } from 'svelte/store';
    import type { Hex, PrivateKeyAccount } from 'viem';
    import { publicClient } from '$lib/util/wallet';
    import { usdtxAbi } from '$lib/util/abi';
    import { formatEther, isHex, parseEther } from 'viem';
    import { debug, startsWith } from '$lib/util';
    import assert from 'assertmin';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { toastMessage } from '$lib/util/toast';

    let privateKeyModalShown = false;
    let privateKeyValue = '';

    let account: PrivateKeyAccount | undefined;
    const toastStore = getToastStore();
    const contractAddress = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd';

    async function onSubmit() {
        privateKeyModalShown = false;

        if (!startsWith(privateKeyValue, '0x')) {
            privateKeyValue = `0x${privateKeyValue}`;
        }

        try {
            account = privateKeyToAccount(privateKeyValue as Hex);
            toastStore.trigger(toastMessage('import-success'));
        } catch {
            toastStore.trigger(toastMessage('import-error'));
            return;
        }

        const bnbBalance = await publicClient.getBalance({ address: account.address });
        const usdtBalance = await publicClient.readContract({
            address: contractAddress,
            abi: usdtxAbi,
            functionName: 'balanceOf',
            args: [account.address]
        });
    }
</script>

<Column name="tools" layout="p-2 space-y-2 overflow-y-auto bg-slate-950">
    {#each new Array(4) as _, i (i)}
        <Row shrink={0} layout="h-96 bg-slate-700 rounded" />
    {/each}
    <button type="button" on:click={() => privateKeyModalShown = !privateKeyModalShown} class="btn flex shrink-0 grow-0 justify-center items-center w-16 h-16 fixed bottom-8 right-8 z-10 shadow-xl rounded-full bg-slate-800 text-5xl">
        <MaterialSymbol name="add" />
    </button>
</Column>

<Modal title="dashboard.import-private-key" shown={privateKeyModalShown}>
    <Input bind:value={privateKeyValue} />
    <Button onClick={onSubmit}>
        Import
    </Button>
</Modal>