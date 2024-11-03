import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { DatePipe } from '@angular/common';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { InputComponent } from '../../../../shared/lib/input/input.component';
import { ButtonComponent } from '../../../../shared/lib/button/button.component';
import { PaginatorComponent } from '../../../../shared/lib/paginator/paginator.component';
import { ProductsService } from '../../../../core/services/products.service';
import { DataSourceProduct } from './data-source';
import { RouterLink } from '@angular/router';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CdkTableModule,
    CdkMenuTrigger,
    CdkMenu,
    DatePipe,
    RouterLink,
    InputComponent,
    ButtonComponent,
    PaginatorComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productsService = inject(ProductsService);
  private destroy$ = new Subject<void>();
  protected searchInput = new FormControl('');
  protected productsDataSource = new DataSourceProduct();
  protected columnDefs = [
    'logo',
    'name',
    'description',
    'date_release',
    'date_revision',
    'actions',
  ];
  protected positions = [
    new ConnectionPositionPair(
      { originX: 'end', originY: 'bottom' },
      { overlayX: 'end', overlayY: 'top' },
    ),
  ];

  protected pageSize = 5;
  protected isOpen = false;

  ngOnInit(): void {
    this.getProducts();
    this.searchInput.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe((val) => {
        this.productsDataSource.filter(val);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.productsDataSource.init(products);
    });
  }

  protected getProductsPage(page: number, pageSize?: number) {
    if (!pageSize) pageSize = this.pageSize;
    this.pageSize = pageSize || 5;
    this.productsDataSource.getPage(page, pageSize!);
  }

  protected deleteProduct(productId: string) {
    const deleteProduct = confirm(
      `¿Estás seguro de que quieres eliminar el producto ${productId}?`,
    );
    if (deleteProduct) {
      this.productsService.deleteProduct(productId).subscribe({
        next: () => {
          alert('Producto eliminado');
        },
        error: () => {
          alert('Error al eliminar producto');
        },
      });
    }
  }
}
