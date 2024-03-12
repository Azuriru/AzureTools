import { NETWORKS, NETWORKS_ALL, type Network } from './wallets';

export type TokenAddress = `0x${string}`;

export type Token = {
    address: TokenAddress;
    network: Network;
}

export const TOKENS_ETHEREUM = [
    // USDT
    '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    // BNB
    '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    // stETH
    '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'
] as const;

export const TOKENS_BSC = [
    // USDT
    '0x524bC91Dc82d6b90EF29F76A3ECAaBAffFD490Bc',
    // BTCB
    '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    // XRP
    '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE'
] as const;

export const TOKENS_ALL = getNetworkTokens(NETWORKS_ALL);

export function getNetworkToken(network: Network): Token[] {
    switch(network) {
        case NETWORKS.ETHEREUM:
            return TOKENS_ETHEREUM.map(address => ({
                address,
                network: NETWORKS.ETHEREUM
            }));
        case NETWORKS.BSC:
            return TOKENS_BSC.map(address => ({
                address,
                network: NETWORKS.BSC
            }));
        default:
            return [];
    }
}

export function getNetworkTokens(networks?: number) {
    const tokens: Token[] = [];

    if (!networks) return tokens;
    if (networks & NETWORKS.ETHEREUM) tokens.push(...getNetworkToken(NETWORKS.ETHEREUM));
    // if (networks & NETWORKS.SEPOLIA) tokens.push(NETWORK_KEYS.SEPOLIA);
    // if (networks & NETWORKS.GOERLI) tokens.push(NETWORK_KEYS.GOERLI);
    // if (networks & NETWORKS.HOLESKY) tokens.push(NETWORK_KEYS.HOLESKY);
    if (networks & NETWORKS.BSC) tokens.push(...getNetworkToken(NETWORKS.BSC));
    // if (networks & NETWORKS.BSC_TESTNET) tokens.push(NETWORK_KEYS.BSC_TESTNET);
    // if (networks & NETWORKS.POLYGON) tokens.push(NETWORK_KEYS.POLYGON);

    return tokens;
}

export function filterTokenByNetwork(tokens: Token[], network: Network): Token[] {
    return tokens.filter(token => token.network === network);
}

export function filterTokenByNetworks(tokens: Token[], networks: number) {
    const _tokens: Token[] = [];

    if (networks & NETWORKS.ETHEREUM) _tokens.push(...filterTokenByNetwork(tokens, NETWORKS.ETHEREUM));
    // if (networks & NETWORKS.SEPOLIA) tokens.push(NETWORK_KEYS.SEPOLIA);
    // if (networks & NETWORKS.GOERLI) tokens.push(NETWORK_KEYS.GOERLI);
    // if (networks & NETWORKS.HOLESKY) tokens.push(NETWORK_KEYS.HOLESKY);
    if (networks & NETWORKS.BSC) _tokens.push(...filterTokenByNetwork(tokens, NETWORKS.BSC));
    // if (networks & NETWORKS.BSC_TESTNET) tokens.push(NETWORK_KEYS.BSC_TESTNET);
    // if (networks & NETWORKS.POLYGON) tokens.push(NETWORK_KEYS.POLYGON);

    return _tokens;
}

export function findDuplicateToken(address: TokenAddress, tokens: Token[]) {
    return tokens.find(token => token.address === address);
}