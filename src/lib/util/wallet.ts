import { createPublicClient, createWalletClient, http } from 'viem';
import { bsc, bscTestnet } from 'viem/chains';
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const targetNetwork = process.env.NODE_ENV == 'development' ? bscTestnet : bsc;
console.log('target network', targetNetwork.name);

type MyType = `0x${string}`;

export let walletClient: any;
export let walletCurrency: any;

export const connected = writable(false);
export const selectedAccount = writable<MyType>('0x0');

export const disconnectWallet = async () => {
    connected.set(false);
    selectedAccount.set('0x0');
};

if (browser) {
    walletClient = createWalletClient({
        chain: targetNetwork,
        transport: http()
    });

    walletCurrency = targetNetwork.nativeCurrency.symbol;
}

export const publicClient = createPublicClient({
    chain: targetNetwork,
    transport: http()
});

export const connectWallet = async () => {
    let response = false;

    if (walletClient) {
        const [address] = await walletClient.requestAddresses();

        if (address) {
            response = true;
            selectedAccount.set(address);
            connected.set(true);
        }

        window.ethereum.on('accountsChanged', async (newAccount: any) => {
            if (newAccount) {
                selectedAccount.set(newAccount);
            }
        });

        window.ethereum.on('chainChanged', async (newChain: any) => {
            if (newChain) {
                disconnectWallet();
            }
        });

        window.ethereum.on('disconnect', async (newChain: any) => {
            if (newChain) {
                disconnectWallet();
            }
        });
    }

    return response;
};
