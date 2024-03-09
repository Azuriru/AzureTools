import CryptoES from 'crypto-es';
import { type Hex, type Chain, type PublicClient } from 'viem';
import { mainnet, goerli, sepolia, holesky, bsc, bscTestnet, polygon } from 'viem/chains';
import type { ValueOf } from './types';
import abi from '$lib/util/abi';

export type Network = ValueOf<typeof NETWORKS>;
export const NETWORKS = {
    ETHEREUM: 1,
    BSC: 2,
    POLYGON: 4,
    SEPOLIA: 8,
    GOERLI: 16,
    HOLESKY: 32,
    BSC_TESTNET: 64
} as const;
export const NETWORKS_ALL = Object.values(NETWORKS).reduce((c, v) => c + v, 0);

export type NetworkNames = ValueOf<typeof NETWORK_NAMES>;
export const NETWORK_NAMES = {
    ETHEREUM: 'Ethereum',
    BSC: 'BNB Smart Chain',
    POLYGON: 'Polygon',
    SEPOLIA: 'Sepolia',
    GOERLI: 'Goerli',
    HOLESKY: 'Holesky',
    BSC_TESTNET: 'Binance Smart Chain Testnet'
} as const;

export type NetworkKeys = ValueOf<typeof NETWORK_KEYS>;
export const NETWORK_KEYS = {
    ETHEREUM: 'networks.ethereum',
    BSC: 'networks.bsc',
    POLYGON: 'networks.polygon',
    SEPOLIA: 'networks.sepolia',
    GOERLI: 'networks.goerli',
    HOLESKY: 'networks.holesky',
    BSC_TESTNET: 'networks.bsctest'
} as const;

export type NetworkRPCs = ValueOf<typeof NETWORK_RPCS>;
export const NETWORK_RPCS = {
    ETHEREUM: 'https://go.getblock.io/c4599000cc5046ffaffb2e2a455397d1',
    BSC: 'https://go.getblock.io/26b25c71cb46443c9683ad99b6fdca29',
    POLYGON: 'https://go.getblock.io/2be973ac141b474abdb392aee51cc2fb',
    SEPOLIA: 'https://go.getblock.io/d233dcde4966477bbb6fe8a805be61f0',
    GOERLI: 'https://go.getblock.io/fe72d50e590e4695aeb1d0cc8ba87c27',
    HOLESKY: 'https://go.getblock.io/8883166e207f4e05bfcd3b1d403c0b3c',
    BSC_TESTNET: 'https://go.getblock.io/c2b981c62b0d4c84bb3c853008a964dc'
} as const;

export function getChain(network: Network): Chain {
    switch(network) {
        case NETWORKS.ETHEREUM:
            return mainnet;
        case NETWORKS.SEPOLIA:
            return sepolia;
        case NETWORKS.GOERLI:
            return goerli;
        case NETWORKS.HOLESKY:
            return holesky;
        case NETWORKS.BSC:
            return bsc;
        case NETWORKS.BSC_TESTNET:
            return bscTestnet;
        case NETWORKS.POLYGON:
            return polygon;
        default:
            return mainnet;
    }
}

export function getChains(networks: number) {
    const nets: Chain[] = [];

    if (networks & NETWORKS.ETHEREUM) nets.push(mainnet);
    if (networks & NETWORKS.SEPOLIA) nets.push(sepolia);
    if (networks & NETWORKS.GOERLI) nets.push(goerli);
    if (networks & NETWORKS.HOLESKY) nets.push(holesky);
    if (networks & NETWORKS.BSC) nets.push(bsc);
    if (networks & NETWORKS.BSC_TESTNET) nets.push(bscTestnet);
    if (networks & NETWORKS.POLYGON) nets.push(polygon);

    return nets;
}

export function getNetworks(networks: number) {
    const nets: Network[] = [];

    if (!networks) return nets;
    if (networks & NETWORKS.ETHEREUM) nets.push(NETWORKS.ETHEREUM);
    if (networks & NETWORKS.SEPOLIA) nets.push(NETWORKS.SEPOLIA);
    if (networks & NETWORKS.GOERLI) nets.push(NETWORKS.GOERLI);
    if (networks & NETWORKS.HOLESKY) nets.push(NETWORKS.HOLESKY);
    if (networks & NETWORKS.BSC) nets.push(NETWORKS.BSC);
    if (networks & NETWORKS.BSC_TESTNET) nets.push(NETWORKS.BSC_TESTNET);
    if (networks & NETWORKS.POLYGON) nets.push(NETWORKS.POLYGON);

    return nets;
}

export function getNetworkRPC(network: Network) {
    switch(network) {
        case NETWORKS.ETHEREUM:
            return NETWORK_RPCS.ETHEREUM;
        case NETWORKS.SEPOLIA:
            return NETWORK_RPCS.SEPOLIA;
        case NETWORKS.GOERLI:
            return NETWORK_RPCS.GOERLI;
        case NETWORKS.HOLESKY:
            return NETWORK_RPCS.HOLESKY;
        case NETWORKS.BSC:
            return NETWORK_RPCS.BSC;
        case NETWORKS.BSC_TESTNET:
            return NETWORK_RPCS.BSC_TESTNET;
        case NETWORKS.POLYGON:
            return NETWORK_RPCS.POLYGON;
    }
}

export function getNetworkName(network: Network) {
    switch(network) {
        case NETWORKS.ETHEREUM:
            return NETWORK_KEYS.ETHEREUM;
        case NETWORKS.SEPOLIA:
            return NETWORK_KEYS.SEPOLIA;
        case NETWORKS.GOERLI:
            return NETWORK_KEYS.GOERLI;
        case NETWORKS.HOLESKY:
            return NETWORK_KEYS.HOLESKY;
        case NETWORKS.BSC:
            return NETWORK_KEYS.BSC;
        case NETWORKS.BSC_TESTNET:
            return NETWORK_KEYS.BSC_TESTNET;
        case NETWORKS.POLYGON:
            return NETWORK_KEYS.POLYGON;
        default:
            return 'networks.unknown';
    }
}

export function getNetworkNames(networks: number) {
    const names: string[] = [];

    if (networks & NETWORKS.ETHEREUM) names.push(NETWORK_KEYS.ETHEREUM);
    if (networks & NETWORKS.SEPOLIA) names.push(NETWORK_KEYS.SEPOLIA);
    if (networks & NETWORKS.GOERLI) names.push(NETWORK_KEYS.GOERLI);
    if (networks & NETWORKS.HOLESKY) names.push(NETWORK_KEYS.HOLESKY);
    if (networks & NETWORKS.BSC) names.push(NETWORK_KEYS.BSC);
    if (networks & NETWORKS.BSC_TESTNET) names.push(NETWORK_KEYS.BSC_TESTNET);
    if (networks & NETWORKS.POLYGON) names.push(NETWORK_KEYS.POLYGON);

    return names;
}

export function getNetworkFile(network: Network, small: boolean = false) {
    const size = small ? 64 : 256;
    const file = (name: string) => `/networks/${name}_${size}.png`;

    switch(network) {
        case NETWORKS.ETHEREUM:
            return file('eth');
        case NETWORKS.SEPOLIA:
            return file('eth_test_s');
        case NETWORKS.GOERLI:
            return file('eth_test_g');
        case NETWORKS.HOLESKY:
            return file('eth_test_h');
        case NETWORKS.BSC:
            return file('bnb');
        case NETWORKS.BSC_TESTNET:
            return file('bnb_test');
        case NETWORKS.POLYGON:
            return file('polygon');
        default:
            return file('unknown');
    }
}

export function getNetworkFiles(networks: number, small: boolean = false) {
    const size = small ? 64 : 256;
    const file = (name: string) => `/networks/${name}_${size}.png`;
    const files: string[] = [];

    if (networks & NETWORKS.ETHEREUM) files.push(file('eth'));
    if (networks & NETWORKS.SEPOLIA) files.push(file('eth_test_s'));
    if (networks & NETWORKS.GOERLI) files.push(file('eth_test_g'));
    if (networks & NETWORKS.HOLESKY) files.push(file('eth_test_h'));
    if (networks & NETWORKS.BSC) files.push(file('bnb'));
    if (networks & NETWORKS.BSC_TESTNET) files.push(file('bnb_test'));
    if (networks & NETWORKS.POLYGON) files.push(file('polygon'));

    return files;
}

export function getNetworkCurrency(network?: string): string | void {
    switch(network) {
        case NETWORK_NAMES.ETHEREUM:
            return 'ETH';
        case NETWORK_NAMES.SEPOLIA:
            return 'sETH';
        case NETWORK_NAMES.GOERLI:
            return 'gETH';
        case NETWORK_NAMES.HOLESKY:
            return 'hETH';
        case NETWORK_NAMES.BSC:
            return 'BNB';
        case NETWORK_NAMES.BSC_TESTNET:
            return 'tBNB';
        case NETWORK_NAMES.POLYGON:
            return 'MATIC';
    }
}

export function getNetworkId(network?: string): Network | void {
    switch(network) {
        case NETWORK_NAMES.ETHEREUM:
            return NETWORKS.ETHEREUM;
        case NETWORK_NAMES.SEPOLIA:
            return NETWORKS.SEPOLIA;
        case NETWORK_NAMES.GOERLI:
            return NETWORKS.GOERLI;
        case NETWORK_NAMES.HOLESKY:
            return NETWORKS.HOLESKY;
        case NETWORK_NAMES.BSC:
            return NETWORKS.BSC;
        case NETWORK_NAMES.BSC_TESTNET:
            return NETWORKS.BSC_TESTNET;
        case NETWORK_NAMES.POLYGON:
            return NETWORKS.POLYGON;
    }
}

export async function readContract<T>(client: PublicClient, address: Hex, functionName: string): Promise<T | null> {
    try {
        return await client.readContract({
            functionName,
            address,
            abi
        }) as Promise<T>;
    } catch {
        return null;
    }
}

export function encrypt(privateKey: string, password: string): string {
    return `${CryptoES.AES.encrypt(privateKey, password)}`;
}

export function decrypt(privateKey: string, password: string): Hex {
    return CryptoES.AES.decrypt(privateKey, password).toString(CryptoES.enc.Utf8) as Hex;
}

export type Wallet = string;