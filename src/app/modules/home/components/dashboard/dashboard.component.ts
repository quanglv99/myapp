import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApexOptions } from "ng-apexcharts";
import { map } from 'rxjs/operators';
import { DonutChartDashboard } from 'src/app/data/models/donutChart.interface';
import { AppConfigService } from 'src/app/shared/services/app.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //donut declare
  donutChartOption: ApexOptions = {
    chart: {
      type:"donut",
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
    plotOptions:{
      pie:{
        donut:{
          labels:{
            show:true,
            total:{
              show: true,
              color: '#FA5656',
              showAlways: true,
            }
          }
        }
      }
    },
    colors: [],
  };

  //line chart
  chartOptions : ApexOptions = {
    series: [
      {
        name: "3G/4G",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148,300]
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
      text: "Kết nối bằng 3G",
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
        "Sep",
        "Oct"
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
  }
  constructor(private appConfig:AppConfigService, private http:HttpClient) {}
  rules: string []= [];
  values: number [] = [];
  colors: string [] = [];
  data! : DonutChartDashboard;
  ngOnInit(): void {
    
    const url = this.appConfig.getDashboardUrl();
    this.http.get(url).pipe(
      map((data: any) => {
        if (Array.isArray(data)) {
          const ruleNames: string[] = [];
          const values: number[] = [];
          const colors: string[] = [];
          data.forEach(item => {
            ruleNames.push(item.rule_name);
            values.push(item.value);
            colors.push(item.color);
          });
          return { ruleNames, values, colors };
        } else {
          throw new Error('Failed');
        }
      })
    ).subscribe(
      ({ ruleNames, values, colors }) => {
        this.rules = ruleNames;
        this.values = values;
        this.colors = colors;

        this.donutChartInit(this.rules,this.values,this.colors);
        this.linechartInit();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  donutChartInit(rules: string[], values: number[], colors: string[]) {
    this.donutChartOption.labels = rules;
    this.donutChartOption.series = values;
    this.donutChartOption.colors = colors;
  }
  
  linechartInit(){
  }
}

