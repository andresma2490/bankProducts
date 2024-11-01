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
}
