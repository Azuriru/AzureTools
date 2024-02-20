import { browser } from '$app/environment';
import { createPublicClient, http, type Hex } from 'viem';
import { bsc, bscTestnet } from 'viem/chains';
import assert from 'assertmin';
import { persistible, centralizedKey } from './store';
import { readable, writable } from 'svelte/store';

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
}

type AddEvent = {
    type: 'add';
    address: Hex;
};

type RemoveEvent = {
    type: 'remove';
    address: Hex;
};

type EditEvent = {
    type: 'edit';
};

type Event = AddEvent | RemoveEvent | EditEvent;

export type State = Hex[];

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

    do(event: Event) {
        switch (event.type) {
            case 'add':
                this.state.push(event.address);
                break;
            case 'remove':
                this.state.splice(this.state.indexOf(event.address), 1);
                break;
            case 'edit':
                // this.state.groups[event.groupIndex].items[event.itemIndex] = event.edited;
                break;
            default:
                assert.unreachable(event);
        }

        this.setter(this);
        this.updateLocalStorage();

        return true;
    }
}

export const wallets = readable<WalletManager>(null as never, (set) => {
    const hist = new WalletManager(set, []);

    set(hist);
});

// Dev
console.log('Target network:', targetNetwork.name);