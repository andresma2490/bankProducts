import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private https = inject(HttpClient);

  public getProducts() {
    return this.https.get<ProductInterface[]>(`${environment.apiUrl}/products`);
  }

  public getProduct(id: string) {
    return this.https.get<ProductInterface>(
      `${environment.apiUrl}/products/${id}`,
    );
  }

  public createProduct(product: ProductInterface) {
    return this.https.post<{ data: ProductInterface }>(
      `${environment.apiUrl}/products`,
      product,
    );
  }

  checkIdIsAvailable(id: string) {
    return this.https.get<boolean>(
      `${environment.apiUrl}/products/verification/${id}`,
    );
  }

  updateProduct(product: ProductInterface) {
    return this.https.put<{ data: ProductInterface }>(
      `${environment.apiUrl}/products/${product.id}`,
      product,
    );
  }

  deleteProduct(id: string) {
    return this.https.delete<{ data: ProductInterface }>(
      `${environment.apiUrl}/products/${id}`,
    );
  }
}
