import { DataSource } from '@angular/cdk/collections';
import { ProductInterface } from '../../../../core/interfaces/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';

export class DataSourceProduct extends DataSource<ProductInterface> {
  private initialData: ProductInterface[] = [];
  private filteredData: ProductInterface[] = [];
  private pageSize = 5;
  private data = new BehaviorSubject<ProductInterface[]>([]);
  public data$ = this.data.asObservable();

  connect(): Observable<ProductInterface[]> {
    return this.data$;
  }

  init(products: ProductInterface[], page = 0, pageSize = 5): void {
    this.initialData = products;
    this.filteredData = products;
    this.getPage(page, pageSize);
  }

  filter(name: string | null) {
    if (!name) {
      this.filteredData = this.initialData;
    } else {
      this.filteredData = this.initialData.filter((product) =>
        product.name.includes(name),
      );
    }
    this.getPage(0, this.pageSize);
  }

  getPage(page: number, pageSize: number): void {
    this.pageSize = pageSize;
    const start = page * pageSize;
    const end = start + pageSize;
    this.data.next(this.filteredData.slice(start, end));
  }

  getLength() {
    return this.filteredData.length;
  }

  delete(id: string) {
    this.initialData = this.initialData.filter((product) => product.id !== id);
    this.filteredData = this.initialData;
  }

  disconnect(): void {}
}
