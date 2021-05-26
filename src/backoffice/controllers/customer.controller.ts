import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpStatus, HttpException } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreatePetContract } from '../contracts/customer/create-pet.contract';
import { AddressDto } from '../dtos/address-dto';
import { CreateCustomerDto } from '../dtos/create-customer-dto';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
    constructor(private readonly accountService: AccountService,
                private readonly customerService: CustomerService) {
        
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try
        {
            const user = await this.accountService.create(new User(model.document, model.password, true)); 

            const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user); 
            const res = await this.customerService.create(customer); 
    
            return new Result('Cliente criado com sucesso!', true, res, null); 
        }
        catch(error){
            throw new HttpException(
                new Result('Não foi possivel realizer o cadastro.', false, null, error),
                HttpStatus.BAD_REQUEST
                ); 
        }
    }

    @Post(':document/addresses/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: AddressDto) {
        try
        {
            await this.customerService.addBillingAddress(document, model); 

            return new Result(null, true, model, null);  
        }
        catch(error)
        {
            throw new HttpException(
                new Result('Não foi possivel adicionar seu endereco.', false, null, error),
                HttpStatus.BAD_REQUEST
                );
        }
    }

    @Post(':document/addresses/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: AddressDto) {
        try
        {
            await this.customerService.addShippingAddress(document, model); 

            return new Result(null, true, model, null); 
        }
        catch(error)
        {
            throw new HttpException(
                new Result('Não foi possivel adicionar seu endereco.', false, null, error),
                HttpStatus.BAD_REQUEST
                );
        }
    }

    @Post(':document/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try
        {
            await this.customerService.createPet(document, model); 

            return new Result(null, true, model, null); 
        }
        catch(error)
        {
            throw new HttpException(
                new Result('Não foi possivel criar seu pet.', false, null, error),
                HttpStatus.BAD_REQUEST
                );
        }
    }

    @Put(':document/pets/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try
        {
            await this.customerService.updatePet(document, id, model); 

            return new Result(null, true, model, null); 
        }
        catch(error)
        {
            throw new HttpException(
                new Result('Não foi possivel atualizar seu pet.', false, null, error),
                HttpStatus.BAD_REQUEST
                );
        }
    }
}