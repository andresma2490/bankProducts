import { Component, inject } from '@angular/core';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductsService } from '../../../../core/services/products.service';
import { ProductInterface } from '../../../../core/interfaces/product.interface';
import { SnackBarService } from '../../../../shared/lib/snack-bar/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent {
  private productsService = inject(ProductsService);
  private snackbar = inject(SnackBarService);
  private router = inject(Router);

  protected formValue?: ProductInterface;

  protected handleCreateProduct(formValue: ProductInterface) {
    this.formValue = formValue;
    this.createProduct();
  }

  protected createProduct() {
    if (!this.formValue) return;
    this.productsService.createProduct(this.formValue).subscribe({
      next: () => {
        this.snackbar.openSnackbar('Producto creado', 'success');
        this.router.navigate(['/products']);
      },
      error: () => {
        this.snackbar.openSnackbar('Error al crear producto', 'error');
      },
    });
  }
}
