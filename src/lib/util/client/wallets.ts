import { type Chain, type PublicClient } from 'viem';
import { writable } from 'svelte/store';
import { type WalletInterface } from './wallet';

export type Wallets = WalletInterface[];
export const wallets = writable<Wallets>([]);

export type Networks = Chain[];
export const networks = writable<Networks>([]);

export type Clients = PublicClient[];
export const clients = writable<Clients>([]);

export type Wallet = string;