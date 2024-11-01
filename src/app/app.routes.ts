import { Routes } from '@angular/router';
import { BaseComponent } from './layouts/base/base.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./views/products/products.routes').then(
            (r) => r.productsRoutes,
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./views/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent,
      ),
  },
];
