export interface Deposit {
    fiatAmount: number,
    fiatCurrency: 'USD' | 'GBP',
    cryptoCurrency: string,
    cryptoAmount: number,
    status: 'PENDING' | 'SUCCESS' | 'FAILED',
    createdAt: any
}