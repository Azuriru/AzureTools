import { writable } from 'svelte/store';
import { type TokenAddress } from '../tokens';
import type { Network } from '../wallets';

export type TokenMetadata = {
    name: string;
    symbol: string;
    decimals: number;
    network: Network;
}

export type TokenCache = Record<TokenAddress, Promise<TokenMetadata>>;

export const tokenCache = writable<TokenCache>({});