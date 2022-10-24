import { Body, Controller, Inject, Post, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { addProductDto } from 'src/Dto/products.dto';
import { Auth } from 'src/Utilites/utils/Auth.decorator';
import { Role } from 'src/Utilites/utils/role.enum';
import { ProductsSellerService } from './productsSeller.service';

@Controller('products')
export class ProductsSellerController {
    constructor(@Inject('SELLER_SERVICE') private readonly sellerService:ProductsSellerService){}
 

    // ADD PRODUCTS 
    @Post('add')
    @UsePipes(ValidationPipe)
    @Auth(Role.SELLER)
    async addProducts(@Request() req,@Body() addproductsDto:addProductDto){
           console.log(req.user)
         
           return this.sellerService.addProducts(req.user.id,addproductsDto);
    }
}
