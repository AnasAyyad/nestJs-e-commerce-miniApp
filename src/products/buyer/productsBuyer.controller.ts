import { Controller, Get, Inject, Param, ParseIntPipe, Post,Body, Request} from '@nestjs/common';
import { boughtProductDto } from 'src/Dto/boughtProduct.dto';
import { Auth } from 'src/Utilites/utils/Auth.decorator';
import { Role } from 'src/Utilites/utils/role.enum';
import { ProductsBuyerService } from './productsBuyer.service';

@Controller('products')
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
    
    @Auth(Role.BUYER)
    @Post('buy')
     async buyProduct(@Request() req,@Body() boughtProductDto:boughtProductDto){
        
      return this.buyerService.buyingProduct(req.user.id,boughtProductDto)
    }

    //Product history 
    @Auth(Role.BUYER)
    @Get('history')
    async getProductHistory(@Request() req){   
             return this.buyerService.showProductsHistory(req.user.id)
    }

  
    
}
