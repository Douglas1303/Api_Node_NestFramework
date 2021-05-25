import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './backoffice/backoffice.module'; 

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ApiNode:244005@apinode.lv4wl.mongodb.net/test'),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
