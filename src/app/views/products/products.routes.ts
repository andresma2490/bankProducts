import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products.component').then((c) => c.ProductsComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/product-list/product-list.component').then(
            (c) => c.ProductListComponent,
          ),
      },
    ],
  },
];
