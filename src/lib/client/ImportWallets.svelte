<script lang="ts">
    import type { Hex } from 'viem';
    import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';
    import { Tab, TabGroup, getToastStore } from '@skeletonlabs/skeleton';
    import { t } from '$lib/i18n';
    import { copy, startsWith } from '$lib/util';
    import { toastMessage } from '$lib/util/toast';
    import { addWallet } from '$lib/util/client/user';
    import { MaterialSymbol, Button, Textarea, Modal, Input } from '$lib/components';
    import { Row } from '$lib/components/layout';

    const toastStore = getToastStore();
    const tablist = [
        'wallets.create',
        'generic.import'
    ];

    let privateKeyModalShown = false;
    let privateKeyModalSelectedTab = 0;
    let privateKeysTarget = '';
    let privateKeysOutput = '';
    let privateKeysValue = '';

    async function onCreate() {
        if (!privateKeysTarget.trim()) {
            return toastStore.trigger(toastMessage('wallets.create-error-empty'));
        }

        const target = Number(privateKeysTarget.trim());

        if (!target) {
            return toastStore.trigger(toastMessage('wallets.create-error-invalid'));
        }

        privateKeysOutput = new Array(target).fill(null).map(_ => generatePrivateKey()).join('\n');
    }

    function onCreateMore() {
        privateKeysTarget = '';
        privateKeysOutput = '';
    }

    async function onImport() {
        if (!privateKeysValue.trim()) {
            toastStore.trigger(toastMessage('wallets.import-all-error-empty'));
            privateKeyModalShown = false;
            return;
        }

        let privateKeys = privateKeysValue.trim().split('\n');
        let importErrors = privateKeys.length;
        let importDuplicates = 0;

        for (let privateKey of privateKeys) {
            if (!startsWith(privateKey, '0x')) {
                privateKey = `0x${privateKey}`;
            }

            try {
                if (privateKeyToAccount(privateKey as Hex).address) {
                    addWallet(privateKey as Hex);
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
    }

    async function onImportCreated(createMore = false) {
        let privateKeys = privateKeysOutput.trim().split('\n');
        for (let privateKey of privateKeys) {
            try {
                if (privateKeyToAccount(privateKey as Hex).address) {
                    addWallet(privateKey as Hex);
                }
            } catch { /* e */ }
        }

        toastStore.trigger(toastMessage('wallets.import-all-success'));

        if (!createMore) {
            privateKeyModalShown = false;
        }
        privateKeysTarget = '';
        privateKeysOutput = '';
    }

    function onDestroy() {
        privateKeyModalSelectedTab = 0;
        privateKeysTarget = '';
        privateKeysOutput = '';
        privateKeysValue = '';
    }

    function onTabChange() {
        privateKeysTarget = '';
        privateKeysOutput = '';
        privateKeysValue = '';
    }
</script>

<Button
    type={0}
    bg="bg-cyan-500"
    layout="w-16 h-16 fixed bottom-8 right-8 z-10 shadow-xl rounded-full text-5xl"
    onClick={() => privateKeyModalShown = !privateKeyModalShown}
>
    <MaterialSymbol name="add" />
</Button>

<Modal title={$t('wallets.manage')} bind:shown={privateKeyModalShown} {onDestroy}>
    <TabGroup
        active="text-cyan-400 hover:text-cyan-500 border-b-2 border-cyan-400"
        hover="hover:text-cyan-500"
        flex="h-8 flex flex-1 items-center justify-center border-b-2"
        rounded="rounded-0"
        border="border-0"
        padding=""
        class="mb-4 text-sm"
        on:click={onTabChange}
    >
        {#each tablist as tab, i (tab)}
            <Tab bind:group={privateKeyModalSelectedTab} name={tab} value={i}>
                {$t(tab)}
            </Tab>
        {/each}
    </TabGroup>
    {#if privateKeyModalSelectedTab}
        <Textarea
            bind:value={privateKeysValue}
            labelClass="flex-col mb-4 font-semibold"
            class="mt-2 font-normal"
            rows={6}
            placeholder={$t('wallets.import-placeholder')}
        >
            {$t('wallets.import-label')}
        </Textarea>
        <Button onClick={onImport}>
            {$t('generic.import')}
        </Button>
    {:else}
        {#if privateKeysOutput}
            <Textarea
                bind:value={privateKeysOutput}
                labelClass="flex-col mb-4 font-semibold"
                class="mt-2 font-normal"
                rows={6}
                placeholder={$t('wallets.output-placeholder')}
            >
                {$t('wallets.output-label')}
            </Textarea>
            <Row layout="mb-3 space-x-3">
                <Button width="w-full" onClick={onCreateMore}>
                    {$t('wallets.create-more')}
                </Button>
                <Button width="w-full" onClick={() => onImportCreated()}>
                    {$t('generic.import')}
                </Button>
                <Button width="w-9 flex-shrink-0" layout="text-xl px-0 h-9" onClick={() => copy(privateKeysOutput)}>
                    <MaterialSymbol name="content_copy" />
                </Button>
            </Row>
            <Button onClick={() => onImportCreated(true)}>
                {$t('wallets.create-more-import')}
            </Button>
        {:else}
            <Input
                bind:value={privateKeysTarget}
                labelClass="flex-col mb-4 font-semibold"
                class="mt-2 font-normal"
                type="number"
                placeholder={$t('wallets.create-placeholder')}
            >
                {$t('wallets.create-label')}
            </Input>
            <Button onClick={onCreate}>
                {$t('wallets.create')}
            </Button>
        {/if}
    {/if}
</Modal>