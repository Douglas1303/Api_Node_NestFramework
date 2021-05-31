import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/store/entities/product.entity';
import { ProductService } from 'src/modules/store/services/product.service';
import { ProductController } from 'src/modules/store/controllers/product.controller';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';
import { OrderController } from './controllers/order.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
        Product,
        Order,
        OrderItem
    ])],
    providers: [
        ProductService,
        OrderService,
        OrderItemService
    ],
    controllers: [
        ProductController,
        OrderController,
    ],
})
export class StoreModule { }