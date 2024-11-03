import { Component, inject, OnInit } from '@angular/core';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductInterface } from '../../../../core/interfaces/product.interface';
import { ProductsService } from '../../../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';

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

  productId!: string;
  formValue?: ProductInterface;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }

  protected handleUpdateProduct(formValue: ProductInterface) {
    this.formValue = formValue;
    this.updateProduct();
  }

  protected updateProduct() {
    if (!this.formValue) return;
    this.productsService.updateProduct(this.formValue).subscribe();
  }
}
