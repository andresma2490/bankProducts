import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { InputComponent } from '../../../../shared/lib/input/input.component';
import { ButtonComponent } from '../../../../shared/lib/button/button.component';
import { PaginatorComponent } from '../../../../shared/lib/paginator/paginator.component';
import { ProductsService } from '../../../../core/services/products.service';
import { DataSourceProduct } from './data-source';
import { DialogComponent } from '../../../../shared/lib/dialog/dialog.component';
import { SnackBarService } from '../../../../shared/lib/snack-bar/snack-bar.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CdkTableModule,
    DialogModule,
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
  private dialog = inject(Dialog);
  private snackbar = inject(SnackBarService);

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
  protected page = 0;
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
    this.pageSize = pageSize;
    this.page = page;
    this.productsDataSource.getPage(page, pageSize!);
  }

  protected deleteProduct(productId: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Eliminar producto',
        message: `¿Estás seguro de que quieres eliminar el producto ${productId}?`,
      },
      width: '30rem',
      height: '11rem',
    });

    dialogRef.closed.subscribe((confirmed) => {
      if (confirmed as boolean) {
        this.productsService.deleteProduct(productId).subscribe({
          next: () => {
            this.snackbar.openSnackbar('Producto eliminado', 'success');
            this.productsDataSource.delete(productId);
            this.getProductsPage(this.page, this.pageSize);
          },
          error: () => {
            this.snackbar.openSnackbar('Error al eliminar producto', 'error');
          },
        });
        dialogRef.close();
      }
    });
  }
}
