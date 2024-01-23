import { Component} from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product: Product | undefined;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService){

  }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      const id = params["productId"];
      this.loading = true;
      this.productService.getProductById(id).subscribe(result => {
        this.product = {...result, id: id}
        this.loading = false;
      });
    })
  }

}
