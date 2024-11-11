import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  standalone: true,
  imports: [TableModule],
})
export class DataTableComponent implements OnInit {
  entries: any;
  @Input() columns: any;
  toolbar: any;
  constructor() {}

  ngOnInit() {}
}
