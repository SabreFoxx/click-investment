import { Plan } from './plan';
import { PaymentMethod } from './payment-method';

export interface DepositDetails {
    method?: PaymentMethod,
    plan?: Plan
}