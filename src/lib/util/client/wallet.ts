import { erc20Abi, type Hex, type PublicClient, type Address, type Abi, type PrivateKeyAccount } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { type Clients } from './wallets';

export type BalancesType = {
    balance: bigint;
    symbol?: string;
}[];

export interface WalletInterface {
    privateKey: Hex;
    account: PrivateKeyAccount;

    get address(): Hex;
    getBalance(client: PublicClient, address: Address, abi?: Abi): Promise<bigint>;
    getBalances(clients: Clients): Promise<BalancesType>;
}

export class Wallet implements WalletInterface {
    privateKey: Hex;
    account: PrivateKeyAccount;

    constructor(privateKey: Hex) {
        this.privateKey = privateKey;
        this.account = privateKeyToAccount(this.privateKey);
    }

    get address() {
        return this.account.address;
    }

    async getBalance(client: PublicClient, address: Address = this.address, abi: Abi = erc20Abi): Promise<bigint> {
        return await client.readContract({
            address,
            abi,
            functionName: 'balanceOf',
            args: [ this.address ]
        }) as Promise<bigint>;
    }

    async getBalances(clients: Clients): Promise<BalancesType> {
        return await Promise.all(Object.values(clients).map(async (client) => {
            const balance = await client.getBalance({ address: this.address });
            const symbol = client.chain?.nativeCurrency.symbol;

            return {
                balance,
                symbol
            };
        }));
    }
}