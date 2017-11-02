import { Component, OnInit } from '@angular/core';
import * as Chart from 'echarts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  echarts = Chart;
  constructor() { }

  ngOnInit() {
    var Chart1 = this.echarts.init(document.getElementById('grafico1'));
    var Chart2 = this.echarts.init(document.getElementById('grafico2'));
    var Chart3 = this.echarts.init(document.getElementById('grafico3'));
    var Chart4 = this.echarts.init(document.getElementById('grafico4'));
    
    Chart1.setOption({
      title: { text: 'ECharts entry example' },
      tooltip: {},
      xAxis: {
          data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
      },
      yAxis: {},
      series: [{
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    });

    Chart2.setOption({
      title: { text: 'ECharts entry example' },
      tooltip: {},
      xAxis: {
          data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
      },
      yAxis: {},
      series: [{
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    });

    Chart3.setOption({
      title: { text: 'ECharts entry example' },
      tooltip: {},
      xAxis: {
          data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
      },
      yAxis: {},
      series: [{
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    });

    Chart4.setOption({
      title: { text: 'ECharts entry example' },
      tooltip: {},
      xAxis: {
          data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
      },
      yAxis: {},
      series: [{
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    });

  }

}
