import CryptoES from 'crypto-es';
import { createPublicClient, http, type Hex } from 'viem';
import { bsc, bscTestnet } from 'viem/chains';
import { currentUser } from './users';
import { get } from 'svelte/store';

// Your secret key
const secretKey = 'your-secret-key';

// The message you want to encrypt
const message = 'Hello, world!';

// Encrypting the message
const encryptedMessage = CryptoES.AES.encrypt(message, secretKey).toString();

// Decrypting the message
const _decryptedMessage = CryptoES.AES.decrypt(encryptedMessage, secretKey).toString(CryptoES.enc.Utf8);


export const targetNetwork = process.env.NODE_ENV == 'development' ? bscTestnet : bsc;
export const contractAddress = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd';

export const publicClient = createPublicClient({
    chain: targetNetwork,
    transport: http()
});

export function encrypt(privateKey: string, password: string): string {
    return `${CryptoES.AES.encrypt(privateKey, password)}`;
}

export function decrypt(privateKey: string, password: string): Hex {
    return CryptoES.AES.decrypt(privateKey, password).toString(CryptoES.enc.Utf8) as Hex;
}

export function add(privateKey: string) {
    const cU = get(currentUser);
    if (!cU) return;

    currentUser.update(user => {
        if (!user) return user;

        user.wallets.push(encrypt(privateKey, cU.password));
        return user;
    });
}

export function remove(privateKey: Hex) {
    currentUser.update(user => {
        if (!user) return user;

        user.wallets.splice(user.wallets.findIndex(pk => pk === privateKey), 1);
        return user;
    });
}

export type Wallet = string;

// Dev
// console.log('Target network:', targetNetwork.name);