import { Component, inject } from '@angular/core';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductsService } from '../../../../core/services/products.service';
import { ProductInterface } from '../../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent {
  private productsService = inject(ProductsService);
  protected formValue?: ProductInterface;

  protected handleCreateProduct(formValue: ProductInterface) {
    this.formValue = formValue;
    this.createProduct();
  }

  protected createProduct() {
    if (!this.formValue) return;
    this.productsService.createProduct(this.formValue).subscribe({
      next: () => {
        alert('Producto creado');
      },
      error: () => {
        alert('Error al crear producto');
      },
    });
  }
}
