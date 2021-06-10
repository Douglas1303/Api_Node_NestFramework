import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { CustomerSchema } from 'src/modules/backoffice/schemas/customer.schema';
import { UserSchema } from 'src/modules/backoffice/schemas/use.schema';

import { AccountService } from 'src/modules/backoffice/services/account.service'; 
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { AddressService } from './services/address.service';
import { PetService } from './services/pet.service';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

import { AddressController } from './controllers/address.controller';
import { PetController } from './controllers/pet.controller';
import { CustomerController } from 'src/modules/backoffice/controllers/customer.controller';
import { AccountController } from './controllers/account.controller';


@Module({
    imports: [
        HttpModule,
        CacheModule.register(), 
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: '333211411sa1w31',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema,
            },
            {
                name: 'User',
                schema: UserSchema,
            },
        ]),
        HttpModule
    ],
    controllers: [AddressController, CustomerController, PetController, AccountController],
    providers: [AccountService, AddressService, CustomerService, PetService, AuthService, JwtStrategy],
})
export class BackofficeModule {}