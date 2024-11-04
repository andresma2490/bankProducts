import { Component, inject, OnInit } from '@angular/core';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductInterface } from '../../../../core/interfaces/product.interface';
import { ProductsService } from '../../../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from '../../../../shared/lib/snack-bar/snack-bar.service';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss',
})
export class ProductUpdateComponent implements OnInit {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private snackbar = inject(SnackBarService);

  productId!: string;
  product?: ProductInterface;
  formValue?: ProductInterface;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productsService.getProduct(this.productId).subscribe((product) => {
      this.product = product;
    });
  }

  protected handleUpdateProduct(formValue: ProductInterface) {
    this.formValue = formValue;
    this.updateProduct();
  }

  protected updateProduct() {
    if (!this.formValue) return;
    this.productsService.updateProduct(this.formValue).subscribe((res) => {
      this.snackbar.openSnackbar('Producto actualizado', 'success');
    });
  }
}
