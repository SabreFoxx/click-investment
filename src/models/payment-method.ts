export interface PaymentMethod {
    name: string,
    cssClass: string,
    description: string,
    type: 'card' | 'wire' | 'crypto'
}
