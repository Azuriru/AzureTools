import { NETWORKS, NETWORKS_ALL, type Network } from './wallets';

type NetworkToken = {
    address: `0x${string}`;
    symbol: string;
};

export type Token = NetworkToken & {
    network: Network;
}

export const TOKENS_ETHEREUM = [
    {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        symbol: 'USDT'
    },
    {
        address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
        symbol: 'BNB'
    },
    {
        address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
        symbol: 'stETH'
    }
] as const;

export const TOKENS_BSC = [
    {
        address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
        symbol: 'BTCB'
    },
    {
        address: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE',
        symbol: 'XRP'
    }
] as const;

export const TOKENS_ALL = getNetworkTokens(NETWORKS_ALL);

export function getNetworkToken(network: Network): Token[] {
    switch(network) {
        case NETWORKS.ETHEREUM:
            return TOKENS_ETHEREUM.map(metadata => ({
                network: NETWORKS.ETHEREUM,
                ...metadata
            }));
        case NETWORKS.BSC:
            return TOKENS_BSC.map(metadata => ({
                network: NETWORKS.BSC,
                ...metadata
            }));
        default:
            return [];
    }
}

export function getNetworkTokens(networks: number) {
    const tokens: Token[] = [];

    if (networks & NETWORKS.ETHEREUM) tokens.push(...getNetworkToken(NETWORKS.ETHEREUM));
    // if (networks & NETWORKS.SEPOLIA) tokens.push(NETWORK_KEYS.SEPOLIA);
    // if (networks & NETWORKS.GOERLI) tokens.push(NETWORK_KEYS.GOERLI);
    // if (networks & NETWORKS.HOLESKY) tokens.push(NETWORK_KEYS.HOLESKY);
    if (networks & NETWORKS.BSC) tokens.push(...getNetworkToken(NETWORKS.BSC));
    // if (networks & NETWORKS.BSC_TESTNET) tokens.push(NETWORK_KEYS.BSC_TESTNET);
    // if (networks & NETWORKS.POLYGON) tokens.push(NETWORK_KEYS.POLYGON);

    return tokens;
}