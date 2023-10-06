import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableUser } from 'src/app/data/models/tableUser.interface';
import { AppConfigService } from 'src/app/shared/services/app.service';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;
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

  ExportToExcel() {
    const exportData = this.data.map((item: TableUser) => ({
      Name: item.name,
      CreatedAt: new Date(item.createdAt).toLocaleDateString(),
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // Iterate through each cell in the first row and apply bold style
    const range = XLSX.utils.decode_range(ws['!ref'] || '');
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const headerAddress = XLSX.utils.encode_col(C) + '1';
      if (ws[headerAddress]) {
        const cell = ws[headerAddress];
        if (!cell.s) cell.s = {};
        cell.s.bold = true;
      }
    }

    // Set column widths (optional)
    const columnWidths = [{ wpx: 200 }, { wpx: 200 }];
    ws['!cols'] = columnWidths;

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
  }

  ExportToPDF(): void {
    let prepare: any[] = [];
  this.data.forEach((e: TableUser) => {
    const tempObj = [];
    tempObj.push(e.name);
    tempObj.push(e.createdAt);
    prepare.push(tempObj);
  });

  const doc = new jsPDF();

  const title = 'ATM Alarm Report';
  const titleFontSize = 16;
  const titleWidth = doc.getStringUnitWidth(title) * titleFontSize;
  const pageWidth = doc.internal.pageSize.width;

  const startX = (pageWidth - titleWidth) / 2;
  const startY = 10; 

  doc.setFontSize(titleFontSize);
  doc.text(title, startX, startY);

  (doc as any).autoTable({
    head: [
      ['Name', 'CreatedAt']
    ],
    body: prepare,
    startY: startY + titleFontSize 
  });

  doc.save('TableData.pdf');
  }
}
