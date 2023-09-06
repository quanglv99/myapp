import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexOptions
} from "ng-apexcharts";
//line chart
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //line chart
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<any>;
  public pieChartOption!: Partial<any>;
  public donutChartOption!: Partial<any>;
  constructor() {}

  ngOnInit(): void {
    //line chart
    this.donutChartInit();
    this.linechartInit();
    this.pieChartInit();
  }

  donutChartInit(){
    this.donutChartOption = {
      chart: {
        type: 'donut',
      },
      labels: ["Bình thường", "Tạm ngừng hoạt động", "Rò điện", "Kết nối bằng 3G","Mất kết nối mạng","Không SIM/Lỗi SIM","Mất điện lưới"], // Replace with your labels
      series: [160, 55, 13, 43, 22,20,10], 
      dataLabels: {
        enabled: true, 
      },
      color:['#47B39C', '#D1D1D1', '#FFC154', '#4DCAF6', '#EBBABF','#F13C59','#EC6B56'],
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
    };
  }
  
  linechartInit(){
    this.chartOptions = {
      series: [
        {
          name: "3G/4G",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Kết nối bằng 3G/4G",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], 
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
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
  }

  pieChartInit()
  {
    this.pieChartOption = {
      chart: {
        type: 'pie',
      },
      labels: ["Bình thường", "Tạm ngừng hoạt động", "Rò điện", "Kết nối bằng 3G","Mất kết nối mạng","Không SIM/Lỗi SIM","Mất điện lưới"], // Replace with your labels
      series: [160, 55, 13, 43, 22,20,10], 
      dataLabels: {
        enabled: true, 
      },
      color:['#47B39C', '#D1D1D1', '#FFC154', '#4DCAF6', '#EBBABF','#F13C59','#EC6B56'],
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
    };
  }
 
}

