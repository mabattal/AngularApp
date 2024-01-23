import { NgModule } from "@angular/core";
import { CategoryCreateComponent } from "./category-create/category-create.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AdminGuard } from "../authentication/admin.guard";
import { AuthenticationModule } from "../authentication/authentication.module";
import { ProductListComponent } from "../products/product-list/product-list.component";

const routes: Routes = [
  {
    path: "categories",
    children: [
      {path:'create', component: CategoryCreateComponent, canActivate: [AdminGuard]},
      { path: ':categoryId', component: ProductListComponent }
    ]
  }
]

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthenticationModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CategoryListComponent,
    CategoryCreateComponent
  ]
})
export class CategoriesModule {

}
