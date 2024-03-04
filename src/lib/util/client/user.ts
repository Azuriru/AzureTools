import { type Hex } from 'viem';
import { writable } from 'svelte/store';
import { type Wallet, encrypt } from '../wallets';

type PinnedItemsType = {
    wallets?: boolean;
    send?: boolean;
    market?: boolean;
    analytics?: boolean;
}

export type User = {
    id: string;
    name: string;
    password: string;
    wallets: Wallet[];
    pinned: PinnedItemsType;
    networks: number;
}

export const currentUser = writable<User | null>(null);

export function addWallet(privateKey: string) {
    currentUser.update(user => {
        if (!user) return user;
        user.wallets.push(encrypt(privateKey, user.password));
        return user;
    });
}

export function removeWallet(privateKey: Hex) {
    currentUser.update(user => {
        if (!user) return user;
        user.wallets.splice(user.wallets.findIndex(pk => pk === privateKey), 1);
        return user;
    });
}