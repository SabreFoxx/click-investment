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
    },
    ON_RAMP_WALLET: {
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
    DEPOSITS = '/dashboard/deposits',
    WITHDRAWALS = '/dashboard/withdrawals',

    DEPOSIT_TRANSACTION = '/deposit',
    WITHDRAWAL_TRANSACTION = '/withdrawal',

    DEPOSIT_FOR_VERIFICATION = '/admin/deposit',
    WITHDRAWAL_FOR_DISBURSAL = '/admin/withdrawal',

    NOTIFICATION = '/notification'
}

export const apiPrefix: { prod: string, dev: string, test: string } = {
    prod: 'https://apis.sabrefoxx.com:3000/click-inv',
    dev: 'http://localhost:3000/click-inv',
    test: 'https://'
}
