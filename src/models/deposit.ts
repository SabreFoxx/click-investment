export interface Deposit {
    id: number,
    fiatAmount: number,
    fiatCurrency: 'USD' | 'GBP',
    cryptoCurrency: string,
    cryptoAmount: number,
    status: 'PENDING' | 'SUCCESS' | 'FAILED',
    paymentMedium: 'XRP', 'XLM', 'CARD',
    createdAt: any,
    storageWalletAddr?: string
}