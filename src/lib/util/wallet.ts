import { type Hex } from 'viem';
import { usdtxAbi } from '$lib/util/abi';
import { contractAddress, publicClient } from './wallets';
import { formatEther } from 'viem';

type BalanceType = {
    chain: bigint;
    usdt: bigint;
}

export async function getBalance(address: Hex): Promise<BalanceType> {
    const chain = await publicClient.getBalance({ address: address });
    const usdt = await publicClient.readContract({
        address: contractAddress,
        abi: usdtxAbi,
        functionName: 'balanceOf',
        args: [ address ]
    });

    return {
        chain,
        usdt
    };
}

export function formatBalance(balance: bigint, decimals: number = 2): string {
    return Number(formatEther(balance)).toFixed(decimals);
}