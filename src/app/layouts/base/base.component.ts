import { Component } from '@angular/core';
import { NavbarComponent } from '../_components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {}
