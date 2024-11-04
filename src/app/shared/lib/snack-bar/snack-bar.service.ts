import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SnackBarComponent } from './snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private overlayRefs: OverlayRef[] = []; // Para manejar múltiples Snackbars
  private currentYOffset: number = 0; // Para ajustar la posición de cada Snackbar

  constructor(private overlay: Overlay) {}

  openSnackbar(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'success',
    duration: number = 3000,
  ) {
    // Crear la configuración del overlay para apilar los Snackbars
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .bottom(`${20 + this.currentYOffset}px`), // Desplazamiento de la posición vertical
      hasBackdrop: false,
    });

    // Crear el Snackbar dinámicamente
    const snackbarPortal = new ComponentPortal(SnackBarComponent);
    const snackbarInstance = overlayRef.attach(snackbarPortal).instance;

    // Pasar propiedades al componente
    snackbarInstance.message = message;
    snackbarInstance.type = type;

    // Incrementar la posición vertical para el siguiente Snackbar
    this.currentYOffset += 40; // Ajustar la distancia entre Snackbars

    // Cerrar el Snackbar después de la duración
    setTimeout(() => {
      overlayRef.dispose();
      this.currentYOffset -= 40; // Reducir el desplazamiento para los siguientes Snackbars
    }, duration);
  }
}
