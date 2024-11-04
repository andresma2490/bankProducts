import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() length!: number;
  @Input() pageSize!: number;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  currentPage: number = 0;

  get totalPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  get pages(): (number | string)[] {
    const totalPages = this.totalPages;
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      // Mostrar todas las páginas si hay <= 6
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre incluir las dos primeras páginas
      pages.push(0, 1);

      // Si la página actual está más allá del rango inicial, agregar `...`
      if (this.currentPage > 3) {
        pages.push('...');
      }

      // Calcular rango dinámico alrededor de la página actual
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(totalPages - 3, this.currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Si la página actual está antes del rango final, agregar `...`
      if (this.currentPage < totalPages - 4) {
        pages.push('...');
      }

      // Siempre incluir las dos últimas páginas
      pages.push(totalPages - 2, totalPages - 1);
    }

    return pages;
  }

  setPageSize(event: any) {
    const pageSize = Number(event?.target?.value || 5);
    this.pageSizeChange.emit(pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPage(pageIndex: number) {
    if (pageIndex >= 0 && pageIndex < this.totalPages) {
      this.currentPage = pageIndex;
      this.pageChange.emit(this.currentPage);
    }
  }
}
