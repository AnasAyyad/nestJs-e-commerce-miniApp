import { Controller, Get, Inject, Param, ParseIntPipe, Post,Body, Request } from '@nestjs/common';
import { boughtProductDto } from 'src/Dto/boughtProduct.dto';
import { Role } from 'src/Utilites/types/role.enum';
import { Roles } from 'src/Utilites/types/roles.decorator';
import { ProductsBuyerService } from './productsBuyer.service';

@Controller('product')
export class ProductsBuyerController {
    constructor(@Inject('BUYER_SERVICE') private readonly buyerService:ProductsBuyerService){}
    
    //searching Products by ID
    @Get('search/:id')
    searchProductId(@Param('id',ParseIntPipe) id:number){
       return this.buyerService.searchProductById(id)
    }

    //searching Products by name

    @Post('search')
    searchProductName(@Body('name') name:string){
        return this.buyerService.searchProductByName(name)
    }

    // buying products
    @Roles(Role.BUYER)
    @Post('buy')
     async buyProduct(@Request() req,@Body() boughtProductDto:boughtProductDto){

        this.buyerService.buyingProduct(req.user.id,boughtProductDto)
    }

    //Product history 
    @Roles(Role.BUYER)
    @Get('history')
    async getProductHistory(@Request() req){   
             return this.buyerService.getProductsHistory(req.user.id)
    }

   
    
}
