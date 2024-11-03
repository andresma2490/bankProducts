import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../shared/lib/input/input.component';
import { ButtonComponent } from '../../../../shared/lib/button/button.component';
import { ProductInterface } from '../../../../core/interfaces/product.interface';
import { checkIdIsAvailable } from '../../validators/id.validator';
import { ProductsService } from '../../../../core/services/products.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, InputComponent, ButtonComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  @Output() createProduct = new EventEmitter<ProductInterface>();
  private productsService = inject(ProductsService);
  private dateRevision = '';

  public productForm = new FormGroup({
    id: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [checkIdIsAvailable(this.productsService)],
      updateOn: 'blur',
    }),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl('', [Validators.required]),
    date_revision: new FormControl(
      { value: this.dateRevision, disabled: true },
      [Validators.required],
    ),
  });

  ngOnInit(): void {
    this.productForm.get('date_release')?.valueChanges.subscribe((val) => {
      if (!val) return;
      this.dateRevision = this.AddYearToDate(val);
      this.productForm.get('date_revision')?.setValue(this.dateRevision);
    });
  }

  protected AddYearToDate(date: string) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate.toISOString().split('T')[0];
  }

  protected handleSubmit() {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) return;
    const formValue = this.productForm.value as unknown as ProductInterface;
    formValue.date_revision = this.dateRevision;
    this.createProduct.emit(formValue);
  }

  protected handleReset() {
    this.productForm.reset();
    this.productForm.get('date_revision')?.setValue(this.dateRevision);
  }
}
