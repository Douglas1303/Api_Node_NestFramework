import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
    constructor(@InjectModel('User') private readonly model: Model<User>) {
        
    }

    async create(data: User): Promise<User> 
    {
        const user = new this.model(data); 

        return await user.save(); 
    }

    async findOneByUsername(username) 
    {
        return new User(username, "122324234242", true); 
    }
}