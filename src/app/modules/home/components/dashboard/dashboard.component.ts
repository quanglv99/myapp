import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApexOptions } from 'ng-apexcharts';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';
import { DonutChartDashboard } from 'src/app/data/models/donutChart.interface';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AppConfigService } from 'src/app/shared/services/app.service';
import { DataService } from '../../service/data.service';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit,OnDestroy {
  private dataFetchSubscription: Subscription | undefined;
  devices: any[] = [];
  totalDevice: number = 0;
  inactiveDevice = 0;
  unableDevice = 0;
  activeDevice = 0;
  //donut declare
  donutChartOption: ApexOptions = {
    chart: {
      type: 'donut',
    },
    series: [],
    labels: [],
    legend: {
      position: 'right',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              color: '#FA5656',
              showAlways: true,
            },
          },
        },
      },
    },
    colors: [],
  };

  //line chart
  chartOptions: ApexOptions = {
    series: [
      {
        name: '3G/4G',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 300],
      },
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Kết nối bằng 3G',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
      ],
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  //new pie-chat
  donutChartOption2: ApexOptions = {
    chart: {
      type: 'donut',
    },
    series: [],
    labels: ['Tạm ngừng hoạt động', 'Bình thường', 'Unable'],
    legend: {
      position: 'right',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              color: '#FA5656',
              showAlways: true,
            },
          },
        },
      },
    },
    colors: ['#D1D1D1', '#47B39C', '#F13C59'],
  };

  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private dataService: DataService
  ) {}
  rules: string[] = [];
  values: number[] = [];
  colors: string[] = [];
  series: number[] = [];
  data!: DonutChartDashboard;
  ngOnInit(): void {
    const token = localStorage.getItem('currentToken');
    if (token) {
      this.getDeviceData(token);
    }
    const url = this.appConfig.getDashboardUrl();
    this.http
      .get(url)
      .pipe(
        map((data: any) => {
          if (Array.isArray(data)) {
            const ruleNames: string[] = [];
            const values: number[] = [];
            const colors: string[] = [];
            data.forEach((item) => {
              ruleNames.push(item.rule_name);
              values.push(item.value);
              colors.push(item.color);
            });
            return { ruleNames, values, colors };
          } else {
            throw new Error('Failed');
          }
        })
      )
      .subscribe(
        ({ ruleNames, values, colors }) => {
          this.rules = ruleNames;
          this.values = values;
          this.colors = colors;

          this.donutChartInit(this.rules, this.values, this.colors);
          this.linechartInit();
          this.donutChart2Init(this.series);

          this.startRealTimeDataFetching();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the data fetch interval
    if (this.dataFetchSubscription) {
      this.dataFetchSubscription.unsubscribe();
    }
  }

  startRealTimeDataFetching() {
    this.dataFetchSubscription = interval(10000).subscribe(() => {
      this.fetchRealtimeData();
    });
  }

  donutChartInit(rules: string[], values: number[], colors: string[]) {
    this.donutChartOption.labels = rules;
    this.donutChartOption.series = values;
    this.donutChartOption.colors = colors;
  }

  donutChart2Init(values: number[]) {
    this.donutChartOption2.series = values;
  }

  linechartInit() {}
  getDeviceData(token: string) {
    const module_id = 'f993acc2-34a4-4740-a9f3-b06ec8b418ca';
    this.authService.getDevice(token, module_id).subscribe(
      (data) => {
        if (data.status == 1) {
          this.devices = data.DeviceMapping;
          for (let item of this.devices) {
            let state = item.device_state;
            switch (state) {
              case 18:
                this.inactiveDevice++;
                break;
              case 32:
                this.unableDevice++;
                break;
              case 34:
                this.activeDevice++;
                break;
            }
          }
          this.series.push(this.inactiveDevice);
          this.series.push(this.activeDevice);
          this.series.push(this.unableDevice);
        } else {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '300px',
            data: {
              message: 'Session has timed out. Please log in again.',
              showYesNo: false,
            },
          });
          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        }
      },
      (error) => {
        console.log('API not response');
      }
    );
  }
  fetchRealtimeData() {
    let i = 0,
      j = 0,
      x = 0;
    const token = localStorage.getItem('currentToken');
    const module_id = 'f993acc2-34a4-4740-a9f3-b06ec8b418ca';
    if (token) {
      this.dataService.fetchData(token, module_id).subscribe(
        (data) => {
          if (data.status == 1) {
            this.devices = data.DeviceMapping;
            for (let item of this.devices) {
              let state = item.device_state;
              switch (state) {
                case 18:
                  i++;
                  break;
                case 32:
                  j++;
                  break;
                case 34:
                  x++;
                  break;
              }
            }
            const newData = [i, x, j];
            this.updateChartData(newData);
          } else {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              width: '300px',
              data: {
                message: 'Session has timed out. Please log in again.',
                showYesNo: false,
              },
            });
            dialogRef.afterClosed().subscribe(() => {
              this.router.navigate(['/login']);
            });
          }
        },
        (error) => {
          console.log('error fetch real-time data');
        }
      );
    }
  }
  updateChartData(data: number[]) {
    this.donutChartOption2.series = data;
  }
}
