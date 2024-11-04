import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
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

type ProductsControls = {
  [key in keyof ProductInterface]: AbstractControl<ProductInterface[key]>;
};

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, InputComponent, ButtonComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() formValue?: Partial<ProductInterface>;
  @Output() saveProduct = new EventEmitter<ProductInterface>();
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
      Validators.minLength(4),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(200),
    ]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl('', [Validators.required]),
    date_revision: new FormControl(
      { value: this.dateRevision, disabled: true },
      [Validators.required],
    ),
  } as ProductsControls);

  ngOnInit(): void {
    this.productForm.get('date_release')?.valueChanges.subscribe((val) => {
      if (!val) return;
      this.dateRevision = this.AddYearToDate(val as string);
      this.productForm.get('date_revision')?.setValue(this.dateRevision);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formValue'] && this.formValue) {
      this.updateFormValues(this.formValue);
    }
  }

  private updateFormValues(formValue: Partial<ProductInterface>) {
    this.productForm.patchValue(formValue);

    const idControl = this.productForm.get('id');
    // remove async validator from id control
    idControl?.clearAsyncValidators();
    idControl?.disable();
    idControl?.updateValueAndValidity();
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
    if (this.formValue?.id) {
      formValue.id = this.formValue.id;
    }
    this.saveProduct.emit(formValue);
  }

  protected handleReset() {
    this.productForm.reset();
    this.productForm.get('date_revision')?.setValue(this.dateRevision);
    this.productForm.get('id')?.setValue(this.formValue?.id ?? '');
  }
}
