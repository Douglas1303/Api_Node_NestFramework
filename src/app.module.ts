import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module'; 

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ApiNodeNest:244005@apinode.lv4wl.mongodb.net/ApiNodeNest'),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
