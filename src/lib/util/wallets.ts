import { createPublicClient, http, type Hex } from 'viem';
import { bsc, bscTestnet } from 'viem/chains';
import { readable } from 'svelte/store';
import assert from 'assertmin';
import { browser } from '$app/environment';
import { centralizedKey } from './store';

export const targetNetwork = process.env.NODE_ENV == 'development' ? bscTestnet : bsc;
export const contractAddress = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd';

export const publicClient = createPublicClient({
    chain: targetNetwork,
    transport: http()
});

interface WalletStack<State, Event> {
    state: State;
    index: number;
    do(event: Event): void;
    add(address: Hex): boolean;
    remove(address: Hex): boolean;
}

type AddEvent = {
    type: 'add';
    address: Hex;
};

type RemoveEvent = {
    type: 'remove';
    index: number;
};

type EditEvent = {
    type: 'edit';
    address: Hex;
    edited: string;
}

type Event = AddEvent | RemoveEvent | EditEvent;

export type Wallet = {
    name: string;
    address: Hex;
}
export type State = Wallet[];

export class WalletManager implements WalletStack<State | null, Event> {
    setter: (hist: WalletManager) => void;
    state: State = [];
    index: number = 0;

    constructor(setter: (hist: WalletManager) => void, state: State) {
        this.setter = setter;
        this.init(state);
    }

    init(state: State) {
        let data: Record<string, State> = {};

        data['wallets'] = state;
        if (browser) {
            const stored = localStorage.getItem(centralizedKey);

            if (stored !== null) {
                data = Object.assign(data, JSON.parse(stored))
            }
        }
        this.state = data['wallets'];
    }

    updateLocalStorage() {
        let data: Record<string, State> = {};

        if (browser) {
            const stored = localStorage.getItem(centralizedKey);

            if (stored !== null) {
                data = Object.assign(data, JSON.parse(stored))
            }

            data['wallets'] = this.state;
            localStorage.setItem(centralizedKey, JSON.stringify(data));
        }
    }

    findIndex(address: Hex): number {
        return this.state.findIndex((wallet) => wallet.address === address);
    }

    get privateKeys() {
        return this.state.map(({ address }) => address);
    }

    do(event: Event) {
        switch (event.type) {
            case 'add':
                this.state.push({
                    name: '',
                    address: event.address
                });
                break;
            case 'remove':
                this.state.splice(event.index, 1);
                break;
            case 'edit':
                this.state[this.findIndex(event.address)].name = event.edited;
                break;
            default:
                assert.unreachable(event);
        }

        this.setter(this);
        this.updateLocalStorage();

        return true;
    }

    add(address: Hex): boolean {
        if (this.findIndex(address) !== -1) return false;

        this.do({
            type: 'add',
            address
        });

        return true;
    }

    remove(address: Hex): boolean {
        const index = this.findIndex(address);

        if (index === -1) return false;

        this.do({
            type: 'remove',
            index
        });

        return true;
    }
}

export const wallets = readable<WalletManager>(null as never, (set) => {
    const hist = new WalletManager(set, []);
    set(hist);
});

// Dev
// console.log('Target network:', targetNetwork.name);