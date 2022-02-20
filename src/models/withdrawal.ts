export interface Withdrawal {
    id: number,
    fiatAmount: number,
    fiatCurrency: 'USD' | 'GBP',
    status: 'PENDING' | 'DISBURSED' | 'REJECTED',
    from: 'DEPOSITED_MONEY' | 'PROFIT',
    PlanId: number,
    userWalletAddr: string,
    createdAt: any
}