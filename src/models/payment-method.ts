export interface PaymentMethod {
    name: string,
    cssClass: string,
    description: string,
    type: 'fiat' | 'crypto'
}
