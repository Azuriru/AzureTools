import { createPublicClient, http, type Hex } from 'viem';
import { bsc, bscTestnet } from 'viem/chains';
import { get } from 'svelte/store';
import { currentUser } from './users';

export const targetNetwork = process.env.NODE_ENV == 'development' ? bscTestnet : bsc;
export const contractAddress = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd';

export const publicClient = createPublicClient({
    chain: targetNetwork,
    transport: http()
});

// this.state.push({
//     name: '',
//     address: event.address
// });
// break;
// case 'remove':
// this.state.splice(event.index, 1);
// break;
// case 'edit':
// this.state[this.findIndex(event.address)].name = event.edited;

export function add(privateKey: Hex) {
    const current = get(currentUser);
    if (!current) return;

    currentUser.update(user => {
        user?.wallets.push(privateKey);
        return user;
    });
}

export function remove(privateKey: Hex) {

}

export type Wallet = Hex;

// Dev
// console.log('Target network:', targetNetwork.name);