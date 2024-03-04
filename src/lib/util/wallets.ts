import assert from 'assertmin';
import CryptoES from 'crypto-es';
import { type Hex, type Chain } from 'viem';
import { mainnet, goerli, sepolia, holesky, bsc, bscTestnet } from 'viem/chains';

export const NETWORKS = {
    ETHEREUM: 1,
    BSC: 2,
    SEPOLIA: 4,
    GOERLI: 8,
    HOLESKY: 16,
    BSC_TESTNET: 32
} as const;

export const NETWORK_KEYS = {
    ETHEREUM: 'networks.ethereum',
    BSC: 'networks.bsc',
    SEPOLIA: 'networks.sepolia',
    GOERLI: 'networks.goerli',
    HOLESKY: 'networks.holesky',
    BSC_TESTNET: 'networks.bsctest'
} as const;

export function getNetworks(networks: number) {
    const nets: Chain[] = [];

    if (networks & NETWORKS.ETHEREUM) nets.push(mainnet);
    if (networks & NETWORKS.SEPOLIA) nets.push(sepolia);
    if (networks & NETWORKS.GOERLI) nets.push(goerli);
    if (networks & NETWORKS.HOLESKY) nets.push(holesky);
    if (networks & NETWORKS.BSC) nets.push(bsc);
    if (networks & NETWORKS.BSC_TESTNET) nets.push(bscTestnet);

    return nets;
}

export function getNetworkNames(networks: number) {
    const names: string[] = [];

    if (networks & NETWORKS.ETHEREUM) names.push(NETWORK_KEYS.ETHEREUM);
    if (networks & NETWORKS.SEPOLIA) names.push(NETWORK_KEYS.SEPOLIA);
    if (networks & NETWORKS.GOERLI) names.push(NETWORK_KEYS.GOERLI);
    if (networks & NETWORKS.HOLESKY) names.push(NETWORK_KEYS.HOLESKY);
    if (networks & NETWORKS.BSC) names.push(NETWORK_KEYS.BSC);
    if (networks & NETWORKS.BSC_TESTNET) names.push(NETWORK_KEYS.BSC_TESTNET);

    return names;
}

export function getNetworkName(network: number) {
    switch(network) {
        case NETWORKS.ETHEREUM:
            return NETWORK_KEYS.ETHEREUM;
        case NETWORKS.BSC:
            return NETWORK_KEYS.BSC;
        case NETWORKS.SEPOLIA:
            return NETWORK_KEYS.SEPOLIA;
        case NETWORKS.GOERLI:
            return NETWORK_KEYS.GOERLI;
        case NETWORKS.HOLESKY:
            return NETWORK_KEYS.HOLESKY;
        case NETWORKS.BSC_TESTNET:
            return NETWORK_KEYS.BSC_TESTNET;
        default:
            assert.eq(getNetworkName(NETWORKS.SEPOLIA | NETWORKS.GOERLI), 'networks.unknown');
    }
}

export function encrypt(privateKey: string, password: string): string {
    return `${CryptoES.AES.encrypt(privateKey, password)}`;
}

export function decrypt(privateKey: string, password: string): Hex {
    return CryptoES.AES.decrypt(privateKey, password).toString(CryptoES.enc.Utf8) as Hex;
}

export type Wallet = string;