import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../categories/category.service';
import { Category } from '../../categories/category.model';
import { NgForm } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  providers: [CategoryService]
})
export class ProductCreateComponent {

  categories: Category[] = [];
  error: string = "";
  //two-way binding
  model: any = {
    categoryId: "0"
  };
  public Editor = ClassicEditor;

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) {

  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  saveProduct(form: NgForm) {

    const extensions = ["jpeg", "jpg", "png"];
    const extension = this.model.imageUrl.split(".").pop();
    if (extensions.indexOf(extension) == -1) {
      this.error = "Resim uzantısı sadece jpeg, jpg, png olmalıdır.";
      return;
    }

    if (this.model.categoryId == "0") {
      this.error = "kategori seçmelisiniz.";
      return;
    }

    const product = {
      id: 0,
      name: this.model.name,
      price: this.model.price,
      stock: this.model.stock,
      isActive: this.model.isActive,
      imageUrl: this.model.imageUrl,
      categoryId: this.model.categoryId,
      description: this.model.description
    }

    if (form.valid) {
      this.productService.createProduct(product).subscribe(data => {
        this.router.navigate(['/products']);
      });
    }
    else {
      this.error = "Formu kontrol ediniz.";
    }
    console.log(this.model);
  }
}
