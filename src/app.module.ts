import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { AgendaModule } from './modules/agenda/agenda.module';
import { StoreModule } from './modules/store/store.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: '7180',
      password: 'YES',
      database: '7180',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BackofficeModule,
    AgendaModule,
     StoreModule,
  ],
})
export class AppModule { 
  // constructor(private readonly connection: Connection) {}
}

