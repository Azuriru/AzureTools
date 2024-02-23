import { type Hex } from 'viem';
import { usdtxAbi } from '$lib/util/abi';
import { contractAddress, publicClient } from './wallets';
import { formatEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

export type BalanceType = {
    chain: bigint;
    usdt: bigint;
}

export class Wallet {
    privateKey: Hex;

    constructor(privateKey: Hex) {
        this.privateKey = privateKey;
    }

    get address() {
        return privateKeyToAccount(this.privateKey).address;
    }

    async getBalance(): Promise<BalanceType> {
        const chain = await publicClient.getBalance({ address: this.address });
        const usdt = await publicClient.readContract({
            address: contractAddress,
            abi: usdtxAbi,
            functionName: 'balanceOf',
            args: [ this.address ]
        });

        return {
            chain,
            usdt
        };
    }

    formatBalance(balance: bigint, decimals: number = 2): string {
        return Number(formatEther(balance)).toFixed(decimals);
    }
}