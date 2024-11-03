import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product.interface';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private https = inject(HttpClient);

  public getProducts() {
    return this.https
      .get<{ data: ProductInterface[] }>(`${environment.apiUrl}/products`)
      .pipe(map((res) => res.data));
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
}
