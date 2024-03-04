import { erc20Abi, createPublicClient, http, type Hex } from 'viem';
import { formatEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';
// import { clients } from './wallets';

export type BalanceType = {
    chain: bigint;
    usdt: bigint;
}

const targetNetwork = mainnet;
export const contractAddress = '0xb131f4A55907B10d1F0A50d8ab8FA09EC342cd74';

export const publicClient = createPublicClient({
    chain: targetNetwork,
    transport: http()
});

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
            abi: erc20Abi,
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