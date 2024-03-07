import CryptoES from 'crypto-es';
import { type Hex, type Chain } from 'viem';
import { mainnet, goerli, sepolia, holesky, bsc, bscTestnet, polygon } from 'viem/chains';

export type Network = typeof NETWORKS[keyof typeof NETWORKS];
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

export type NetworkNames = typeof NETWORK_NAMES[keyof typeof NETWORK_NAMES];
export const NETWORK_NAMES = {
    ETHEREUM: 'Ethereum',
    BSC: 'BNB Smart Chain',
    POLYGON: 'Polygon',
    SEPOLIA: 'Sepolia',
    GOERLI: 'Goerli',
    HOLESKY: 'Holesky',
    BSC_TESTNET: 'Binance Smart Chain Testnet'
} as const;

export type NetworKeys = typeof NETWORK_KEYS[keyof typeof NETWORK_KEYS];
export const NETWORK_KEYS = {
    ETHEREUM: 'networks.ethereum',
    BSC: 'networks.bsc',
    POLYGON: 'networks.polygon',
    SEPOLIA: 'networks.sepolia',
    GOERLI: 'networks.goerli',
    HOLESKY: 'networks.holesky',
    BSC_TESTNET: 'networks.bsctest'
} as const;

export function getNetwork(network: Network): Chain {
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

export function getNetworks(networks: number) {
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

export function getNetworkId(network?: string): number | void {
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

export function encrypt(privateKey: string, password: string): string {
    return `${CryptoES.AES.encrypt(privateKey, password)}`;
}

export function decrypt(privateKey: string, password: string): Hex {
    return CryptoES.AES.decrypt(privateKey, password).toString(CryptoES.enc.Utf8) as Hex;
}

export type Wallet = string;