<script lang="ts" context="module">
    let globalZIndex = 10;

    function getZIndex() {
        globalZIndex += 1;
        return globalZIndex;
    }
</script>

<script lang="ts">
    import { tick } from 'svelte';
    import type { ActionReturn } from 'svelte/action';
    import Icon from './MaterialSymbol.svelte';

    export let shown = false;
    export let title = '';
    export let width = 'w-96';
    export let height = '';
    export let onDestroy: () => void = () => {};

    let zIndex = -1;
    let wasShown = false;

    $: if (shown && !wasShown) {
        wasShown = true;
        zIndex = getZIndex();
    } else if (wasShown && !shown) {
        wasShown = false;

        const modalWrapper = document.querySelector('#modal-wrapper');

        if (modalWrapper) {
            const isLast = [...modalWrapper.children].filter(modal => modal.classList.contains('modal-container')).length === 1;

            if (isLast) {
                modalWrapper.querySelector('.modal-backdrop')?.classList.remove('flex');
                modalWrapper.querySelector('.modal-backdrop')?.classList.add('hidden');
            }
        }
    }

    function onClick(e: MouseEvent) {
        const { currentTarget, target } = e;

        if (currentTarget === target) {
            shown = !shown;
        }
    }

    function portalTo(node: HTMLElement): ActionReturn {
        tick().then(() => {
            const modalWrapper = document.querySelector('#modal-wrapper');

            if (!modalWrapper) return;

            modalWrapper.append(node);

            const hasModals = [...modalWrapper.children].filter(modal => modal.classList.contains('modal-container')).length;

            if (hasModals) {
                modalWrapper.querySelector('.modal-backdrop')?.classList.remove('hidden');
                modalWrapper.querySelector('.modal-backdrop')?.classList.add('flex');
            }
        });

        return {
            destroy() {
                onDestroy();
            }
        }
    }
</script>

{#if shown}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-container fixed m-auto top-0 left-0 right-0 bottom-0 flex backdrop-blur-sm" on:click={onClick} use:portalTo style:z-index={zIndex}>
        <div class="modal flex flex-col {width} {height} max-h-[580px] bg-slate-800 rounded-md overflow-hidden m-auto">
            <div class="header flex justify-between items-start text-lg font-semibold p-5 bg-slate-600">
                <div class="title">{title}</div>
                <button type="button" class="close text-2xl h-6 w-6" on:click={() => shown = !shown}>
                    <Icon name="close" />
                </button>
            </div>
            <div class="body flex flex-col p-5 overflow-auto">
                <slot />
            </div>
            {#if $$slots.footer}
                <div class="footer flex flex-col p-5">
                    <slot name="footer" />
                </div>
            {/if}
        </div>
    </div>
{/if}
