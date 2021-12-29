import { Plan } from './plan';
import { PaymentMethod } from './payment-method';

export interface PaymentTools {
    currency: PaymentMethod,
    plan?: Plan // plan to pay to
}