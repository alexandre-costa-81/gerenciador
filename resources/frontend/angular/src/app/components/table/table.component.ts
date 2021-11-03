import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Actions } from './Actions';
import { TableColumn } from './TableColumn';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  public tableDataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[] = [];
  public displayedActions: Actions = {edit: true, view: true, delete: true};

  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns!: TableColumn[];
  @Input() actions!: Actions;
  @Input() rowActions: string = '';
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();

  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowEditAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowViewAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDeleteAction: EventEmitter<any> = new EventEmitter<any>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor() {}

  ngOnInit(): void {
    this.rowActions = 'actions';
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    this.displayedColumns = columnNames

    if (this.rowActions) {
      this.displayedColumns.push(this.rowActions);
    }

    this.actions &&
      (this.displayedActions = this.actions);
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.paginator._intl.itemsPerPageLabel = 'Items por páginas';
    this.tableDataSource.paginator._intl.nextPageLabel = 'Próxima página';
    this.tableDataSource.paginator._intl.previousPageLabel = 'Página anterior';
    this.tableDataSource.paginator._intl.firstPageLabel = 'Primeira página';
    this.tableDataSource.paginator._intl.lastPageLabel = 'Ultima página';
    this.tableDataSource.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => `Página ${page + 1} de ${Math.ceil(length / pageSize)}`;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns?.find(column => column.name === sortParameters.active)?.dataKey!;
    this.sort.emit(sortParameters);
  }

  emitRowEditAction(row: any) {
    this.rowEditAction.emit(row);
  }

  emitRowViewAction(row: any) {
    this.rowViewAction.emit(row);
  }

  emitRowDeleteAction(row: any) {
    this.rowDeleteAction.emit(row);
  }
}
