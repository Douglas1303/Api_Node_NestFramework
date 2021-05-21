import { Address } from './addess.model';
import { Creditcard } from './credit-card.model';
import { Pet } from './pet.model';

export class Customer {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public password: string,
        public active: boolean,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: Creditcard,
    ) { }
}