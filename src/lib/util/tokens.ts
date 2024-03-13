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
    // ETH
    '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    // MATIC
    '0xCC42724C6683B7E57334c4E856f4c9965ED682bD',
    // BTCB
    '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    // XRP
    '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE'
] as const;

export const TOKENS_POLYGON = [
    // MATIC
    '0x0000000000000000000000000000000000001010',
    // USDT
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    // BNB
    '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3',
    // USDC
    '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    // BUSD
    '0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7',
    // XRP
    '0x6f8a06447Ff6FcF75d803135a7de15CE88C1d4ec'
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
        case NETWORKS.POLYGON:
            return TOKENS_POLYGON.map(address => ({
                address,
                network: NETWORKS.POLYGON
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
    if (networks & NETWORKS.POLYGON) tokens.push(...getNetworkToken(NETWORKS.POLYGON));

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
    if (networks & NETWORKS.POLYGON) tokens.push(...filterTokenByNetwork(tokens, NETWORKS.POLYGON));

    return _tokens;
}

export function findDuplicateToken(address: TokenAddress, tokens: Token[]) {
    return tokens.find(token => token.address === address);
}