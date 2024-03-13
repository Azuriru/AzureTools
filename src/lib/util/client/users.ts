import CryptoES from 'crypto-es';
import { get, type Unsubscriber } from 'svelte/store';
import { createPublicClient, http } from 'viem';
import { persistible } from '../store';
import { getNetworkTokens } from '../tokens';
import { decrypt, getChains, getNetworkId, getNetworkRPC, readContract } from '../wallets';
import { tokenCache, type TokenCache } from './cache';
import { currentUser, type User } from './user';
import { Wallet } from './wallet';
import { clients, networks, wallets } from './wallets';

export const users = persistible<User[]>('users', []);
export const currentSession = persistible<string | null>('session', null);

const _unsubscribeSession = currentSession.subscribe(session => {
    let currentUserUnsubscribe: Unsubscriber = () => {};

    if (session) {
        const user = get(users).find(user => user.id === session);

        if (!user) return;

        currentUser.set(user);
        currentUserUnsubscribe = currentUser.subscribe((user) => {
            users.update(users => users);

            if (!user) return;

            wallets.update(() => {
                return user.wallets.map(hash => {
                    return new Wallet(decrypt(hash, user.password));
                });
            });

            networks.update(() => {
                const networks = getChains(user.networks);
                const tokens = [ ...getNetworkTokens(user.networks), ...user.tokens ];

                clients.set(networks.reduce((chains, chain) => {
                    const id = getNetworkId(chain.name);

                    if (!id) return chains;

                    chains[id] = createPublicClient({
                        chain,
                        transport: http(getNetworkRPC(id))
                    });

                    tokenCache.update((cache: TokenCache) => {
                        const getMetadata = async (address: `0x${string}`) => {
                            return {
                                name: await readContract<string>(chains[id], address, 'name') || 'token.no-name',
                                decimals: await readContract<number>(chains[id], address, 'decimals') || 18,
                                symbol: await readContract<string>(chains[id], address, 'symbol') || 'token.no-symbol',
                                network: id
                            };
                        };

                        for (const { address } of tokens.filter(token => token.network === id)) {
                            if (Object.prototype.hasOwnProperty.call(cache, address)) continue;

                            cache[address] = getMetadata(address);
                        }

                        return cache;
                    });

                    return chains;
                }, {}));
                return networks;
            });
        });
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
        tokens: [],
        pinned: {
            wallets: true
        },
        networks: 1,
        settings: {
            tokens: {
                visibility: {},
                disabled: {}
            }
        }
    };
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