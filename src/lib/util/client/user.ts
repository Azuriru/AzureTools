import { type Hex } from 'viem';
import { type Wallet, encrypt } from '../wallets';
import { type Token } from '../tokens';
import { writable } from 'svelte/store';

type PinnedItemsType = {
    wallets?: boolean;
    tokens?: boolean;
    send?: boolean;
    market?: boolean;
    analytics?: boolean;
}

type SettingsType = {
    tokens: {
        disabled: Record<string, boolean>;
        visibility: Record<string, boolean>;
    }
    // wallets: Hex[];
}

export type User = {
    id: string;
    name: string;
    password: string;
    wallets: Wallet[];
    tokens: Token[];
    pinned: PinnedItemsType;
    networks: number;
    settings: SettingsType;
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

export function addToken({ address, network }: Token) {
    currentUser.update(user => {
        if (!user) return user;
        user.tokens.push({
            address,
            network
        });
        return user;
    });
}

export function removeToken(address: Hex) {
    currentUser.update(user => {
        if (!user) return user;
        user.tokens.splice(user.tokens.findIndex(token => token.address === address), 1);
        return user;
    });
}