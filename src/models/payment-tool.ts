import { Plan } from './plan';
import { PaymentMethod } from './payment-method';

export interface PaymentTool {
    medium: PaymentMethod,
    plan?: Plan // plan to pay to
}