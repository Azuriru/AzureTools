import { writable } from 'svelte/store';
import { type TokenAddress } from '../tokens';

export type TokenMetadata = {
    name: string;
    symbol: string;
    decimals: number;
}

export type TokenCache = Record<TokenAddress, Promise<TokenMetadata>>;

export const tokenCache = writable<TokenCache>({});