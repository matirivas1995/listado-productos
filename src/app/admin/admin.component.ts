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
    var myChart = this.echarts.init(document.getElementById('main'));
    myChart.setOption({
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
