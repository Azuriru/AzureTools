import { type Chain, type PublicClient } from 'viem';
import { writable } from 'svelte/store';

export const clients = writable<PublicClient[]>([]);

export const networks = writable<Chain[]>([]);

export type Wallet = string;