import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ProductsService } from '../../../core/services/products.service';
import { map, Observable } from 'rxjs';

export function checkIdIsAvailable(
  productsService: ProductsService,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return productsService
      .checkIdIsAvailable(control.value)
      .pipe(map((exists) => (exists ? { idAlreadyInUse: true } : null)));
  };
}
