import CryptoES from 'crypto-es';
import { persistible } from '../store';
import { get, type Unsubscriber } from 'svelte/store';
import { currentUser, type User } from './user';

export const users = persistible<User[]>('users', []);
export const currentSession = persistible<string | null>('session', null);

const _unsubscribeSession = currentSession.subscribe(session => {
    let currentUserUnsubscribe: Unsubscriber = () => {};

    if (session) {
        const user = get(users).find(user => user.id === session);

        if (!user) return;

        currentUser.set(user);
        currentUserUnsubscribe = currentUser.subscribe(() => users.update(users => users));
    }

    return currentUserUnsubscribe;
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
        pinned: {},
        networks: 1
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

export function setUser(id: string) {
    currentSession.set(id);
}

export function unsetUser() {
    currentSession.set(null);
}