// import { writable } from 'svelte/store';
import { persistible } from './store';

type PinnedItemsType = {
    wallets: boolean;
    send?: boolean;
    market?: boolean;
    analytics?: boolean;
}

export const pinned = persistible<PinnedItemsType>('pinned', {
    wallets: true
});