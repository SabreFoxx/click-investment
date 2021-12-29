export interface WithdrawalBlock {
    depositId: number,
    description: string,
    amount: number,
    status: 'available' | 'unavailable' | 'withdrawn',
    statusMessage: string,
    cssClass: 'success' | 'pending' | 'failure'
}