import { CryptoWallet } from 'src/models/crypto-wallet';

export const cryptoWallets: { [name: string]: CryptoWallet } = {
    XLM: {
        currencyName: 'XLM',
        barcodeImagePath: '/assets/img/qr.jpeg',
        walletAddress: '0xc207B49306d5324c22B3c10827AF03E5875B99C7'
    },
    XRP: {
        currencyName: 'XRP',
        barcodeImagePath: '/assets/img/qr.jpeg',
        walletAddress: '0xc207B49306d5324c22B3c10827AF03E5875B99C7'
    }
};

export enum ApiEndpoints {
    REGISTRATION = '/register',
    LOGIN = '/login',
    REFRESH_LOGIN = '/refresh-user-data',

    DASHBOARD = '/dashboard',
    CREATE_DEPOSIT_TRANSACTION = '/deposit',
    CREATE_WITHDRAWAL_TRANSACTION = '/withdrawal',
    FETCH_UNVERIFIED_DEPOSITS = '/deposit'
}

export const apiPrefix: { prod: string, dev: string, test: string } =
    { prod: 'https://', dev: 'http://localhost:3000/api', test: 'https://' }
