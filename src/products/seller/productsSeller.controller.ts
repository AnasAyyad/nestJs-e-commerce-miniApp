import { Body, Controller, Inject, Post, Param,UsePipes, ValidationPipe, Request, Patch, Delete, ParseIntPipe, } from '@nestjs/common';
import { addProductDto } from 'src/Dto/products.dto';
import { updateProductDto } from 'src/Dto/updateProduct.dto';
import { Auth } from 'src/Utilites/utils/Auth.decorator';
import { Role } from 'src/Utilites/utils/role.enum';
import { ProductsSellerService } from './productsSeller.service';

@Controller('products')
export class ProductsSellerController {
    constructor(@Inject('SELLER_SERVICE') private readonly sellerService:ProductsSellerService){}
 

    // ADD PRODUCTS 
    @Post('product')
    @UsePipes(ValidationPipe)
    @Auth(Role.SELLER)
    async addProducts(@Request() req,@Body() addproductsDto:addProductDto){
          
         
           return this.sellerService.addProducts(req.user.id,addproductsDto);
    }
    @Patch('product/:id')
    @Auth(Role.SELLER)
    async updateProduct( @Param('id',ParseIntPipe) id:number, @Body() updateProductDto:updateProductDto,@Request() req){
        await this.sellerService.editProduct(req.user.id,id,updateProductDto)
        return {msg:'Product updated successfully'}
    }

    @Delete('product/:id')
    @Auth(Role.SELLER)
    async deleteProduct(@Param('id',ParseIntPipe) id:number,@Request() req) {
        await this.sellerService.removeProduct(req.user.id,id)   
        return {msg:'Product deleted successfully'}
     }

}
