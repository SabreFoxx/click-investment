// a WithdrawalBlock is actually a transformed Deposit  
// if you look at withdraw.component.ts, we transformed a Deposit to a WithdrawBlock
export interface WithdrawalBlock {
    depositId: number,
    description: string,
    amount: number,
    status: 'available' | 'unavailable' | 'withdrawn' | string,
    statusMessage: string,
    cssClass: 'success' | 'pending' | 'failure' | string
}