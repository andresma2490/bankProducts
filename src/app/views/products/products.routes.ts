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
      {
        path: 'create',
        loadComponent: () =>
          import('./views/product-create/product-create.component').then(
            (c) => c.ProductCreateComponent,
          ),
      },
      {
        path: 'update/:id',
        loadComponent: () =>
          import('./views/product-update/product-update.component').then(
            (c) => c.ProductUpdateComponent,
          ),
      },
    ],
  },
];
