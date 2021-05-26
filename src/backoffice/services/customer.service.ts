import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/backoffice/models/customer.model';
import { Address } from '../models/address.model';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async addBillingAddress(document: string, data: Address) : Promise<Customer> {
        const options = { upsert: true }; 

        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                billingAddress: data, 
            }
        }, options); 
    }

    async addShippingAddress(document: string, data: Address) : Promise<Customer> {
        const options = { upsert: true }; 

        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                shippingAddress: data, 
            }
        }, options); 
    }

    // async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
    //     return await this.model.findOneAndUpdate({ document }, data);
    // }

    // async find(document): Promise<Customer> {
    //     return await this.model.findOne({ document }).exec();
    // }

    // async findAll(): Promise<Customer[]> {
    //     return await this.model.find({}, 'firstName lastName name email document').exec();
    // }

    // async query(model: QueryDto): Promise<Customer[]> {
    //     return await this.model.find(model.query, model.fields, { skip: model.skip, limit: model.take }).exec();
    // }

    // async saveOrUpdateCreditCard(document: string, data: CreditCard): Promise<Customer> {
    //     const options = { upsert: true };
    //     return await this.model.findOneAndUpdate({ document }, {
    //         $set: {
    //             card: data,
    //         },
    //     }, options);
    // }
}