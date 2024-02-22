import { persistible } from './store';

export const pinned = persistible('pinned', {
    wallets: true
});