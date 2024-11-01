import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: [],
})
export class ProductsComponent {}
