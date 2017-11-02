import { Component, OnInit } from '@angular/core';
import * as Chart from 'echarts';
import { FirebaseService }          from '../services/firebase.service';
import { Barras } from '../barras';
import { Venta } from '../venta';
import { Lines } from '../lines'
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  echarts = Chart;
  constructor(private firebaseService:FirebaseService) { }
  ventas:any;
  barrasList : Barras[];
  lineasList : Lines[];
  month = ["Ago","Sep","Oct","Nov","Dic"];
  public barraSubject = new BehaviorSubject([]);
  lista: any;


  ngOnInit() {
    this.firebaseService.getVentas().subscribe(ventas => {
        this.ventas = ventas;
        this.cargarBarras();
        this.loadBarras();
        this.showChartMati();
        this.funcionMaricona();
        this.showChart2();
    });

    var Chart1 = this.echarts.init(document.getElementById('grafico1'));
    var Chart2 = this.echarts.init(document.getElementById('grafico2'));
    var Chart4 = this.echarts.init(document.getElementById('grafico4'));

    Chart1.setOption({
        title : {
            text: 'Productos Vendidos',
            subtext: '(cantidad)',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['data1','data2','data3','data4','data5']
        },
        series : [
            {
                name: 'cantidad',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'data1'},
                    {value:310, name:'data2'},
                    {value:234, name:'data3'},
                    {value:135, name:'data4'},
                    {value:1548, name:'data5'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]   
    });

    Chart4.setOption({
        tooltip : {
            trigger: 'axis',
            axisPointer : {         
                type : 'shadow'        
            }
        },
        legend: {
            data: ['data1', 'data2','data3','data4','data5']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['item1','item2','item3','item4','item5','item6','item7']
        },
        series: [
            {
                name: 'conjunto1',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: 'conjunto2',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'conjunto3',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'conjunto4',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
                name: 'conjunto6',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320]
            }
        ]
    });
  }

  cargarBarras(){
    this.ventas.forEach(venta => {
        var fecha = venta.fecha.substr(4,3);
        venta.items.forEach(element => {
          let current = this.barraSubject.getValue();
          let dup = current.find(c=>c.name==element.producto);
          if(dup) {
            for(var i=0;i<this.month.length;i++){
              if(this.month[i]==fecha){
                dup.data[i]=dup.data[i]+element.cantidad;
              }
            }
          }
          else{
            var barra = new Barras();
            barra.name=element.producto;
            for(var i=0;i<this.month.length;i++){
              if(this.month[i]==fecha){
                barra.data[i]= barra.data[i]+element.cantidad;
              }
            }
            current.push(barra);
            this.barraSubject.next(current);
          }
        });
    });
  }
  loadBarras(){
    this.barraSubject.subscribe(res => {
        this.barrasList = res;
    })
  }
  showChartMati(){
    var Chart3 = this.echarts.init(document.getElementById('grafico3'));
    Chart3.setOption({
      title : {
          text: 'Grafico de Barras Multiples',
          subtext: '(valores acumulados)'
      },
      tooltip : {
          trigger: 'axis'
      },
      toolbox: {
          show : true,
          feature : {
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              data : ['ago','sept','oct','nov','dic']
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : this.barrasList
  });
    
  }




  showChart2(){
    const Chart2 = this.echarts.init(document.getElementById('grafico2'));

    Chart2.setOption({
        title: {
            text: 'Cantidad Acumulada',
            subtext: 'Ventas Acumuladas',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
            show:false,
            left: 'left',
            data: ['jamon', 'queso']
        },
        xAxis: {
            type: 'category',
            name: 'mes',
            splitLine: {show: false},
            data: ['ago', 'sep','oct','nov','dic']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'log',
            name: 'cantidad'
        },
        series:this.lineasList
    });
  }
  funcionMaricona(){
    this.lineasList=this.barrasList;
    this.lineasList.forEach(ref=>{
        ref.type='line'
        for (var i=1; i<ref.data.length;i++)
        {
          ref.data[i]=ref.data[i]+ref.data[i-1];
        }
    })
  }
}

