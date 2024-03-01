import CryptoES from 'crypto-es';
import type { Wallet } from './wallets';
import { persistible } from './store';
import { get, writable } from 'svelte/store';

type PinnedItemsType = {
    wallets?: boolean;
    send?: boolean;
    market?: boolean;
    analytics?: boolean;
}

type User = {
    id: string;
    name: string;
    password: string;
    wallets: Wallet[];
    pinned: PinnedItemsType;
}

export type Users = User[];
export const users = persistible<Users>('users', []);
export const currentSession = persistible<string | null>('session', null);
export const currentUser = writable<User | null>(null);

export const currentUserUnsub = currentUser.subscribe(() => {
    users.update(users => users);
});

export function hash(string: string) {
    return `${CryptoES.SHA256(string)}`;
}

function createUser(name: string, password: string): User {
    const id = `${CryptoES.MD5(Date.now() + name)}`;
    const hash = `${CryptoES.SHA256(password)}`;

    return {
        id,
        name,
        password: hash,
        wallets: [],
        pinned: {}
    }
}

export function addUser(name: string, password: string) {
    users.update(users => {
        users.push(createUser(name, password));
        return users;
    });
}

export function removeUser(id: string) {
    users.update(users => {
        users.splice(users.findIndex(user => user.id === id), 1);
        return users;
    });
}

export function setUser(index: number) {
    currentSession.set(get(users)[index].id);
}

export function unsetUser() {
    currentSession.set(null);
}