import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableUser } from 'src/app/data/models/tableUser.interface';
import { AppConfigService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-table-tab-component',
  templateUrl: './table-tab-component.component.html',
  styleUrls: ['./table-tab-component.component.css'],
})
export class TableTabComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;
  title: string = 'Home';
  displayedColumns: string[] = ['id', 'name', 'avatar', 'createdAt'];
  dataSource: any;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  ngOnInit(): void {
    this.initDataTable();
  }
  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getHomeUrl();
      this.http.get(url).subscribe((result) => {
        this.data = result;
        this.dataSource = new MatTableDataSource<TableUser>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
}
