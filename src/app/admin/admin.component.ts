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

  cantidad_productos:number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  nombres_productos:string[]=[""];
  list_item:any[]=[""];

  ngOnInit() {
    this.firebaseService.getVentas().subscribe(ventas => {
        this.ventas = ventas;
        this.cargarBarras();
        this.loadBarras();
        this.showChartMati();
        this.funcionMaricona();
        this.showChart2();
        this.funcionSantiago();
        this.showCharts1();
    });

    var Chart4 = this.echarts.init(document.getElementById('grafico4'));

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
  funcionSantiago(){
    
    var i=0;
    var band=0;
    this.ventas.forEach(venta=>{
        venta.items.forEach(item=>{
            band=0;
            this.nombres_productos.forEach(nombre=>{
                if (item.producto == nombre)
                {
                    band=1;
                }

            })
            if (band == 0)
            {
                this.nombres_productos.push(item.producto);
            }
        })
    });
    this.ventas.forEach(venta=>{
        venta.items.forEach(item=>{
            this.list_item.push(item)
        })
            })
    var i=0;
    this.nombres_productos.forEach(nombre=>{
        this.list_item.forEach(item=>{
            if (nombre==item.producto)
            {
                this.cantidad_productos[i]=this.cantidad_productos[i]+item.cantidad;
            }
        })
        i++;
    })
    for (var _i = 0; _i < this.cantidad_productos.length-1; _i++)
    {
        var aux=this.cantidad_productos[_i];
        this.cantidad_productos[_i]=this.cantidad_productos[_i+1];
        this.cantidad_productos[_i+1]=aux;
        var aux2=this.nombres_productos[_i];
        this.nombres_productos[_i]=this.nombres_productos[_i+1];
        this.nombres_productos[_i+1]=aux2;
    }
    }

    showCharts1(){
        const Chart1 = this.echarts.init(document.getElementById('grafico1'));
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
                data: [this.nombres_productos[0],this.nombres_productos[1],this.nombres_productos[2],this.nombres_productos[3],this.nombres_productos[4]]
            },
            series : [
                {
                    name: 'Cantidad Vendida',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:this.cantidad_productos[0], name:this.nombres_productos[0]},
                        {value:this.cantidad_productos[1], name:this.nombres_productos[1]},
                        {value:this.cantidad_productos[2], name:this.nombres_productos[2]},
                        {value:this.cantidad_productos[3], name:this.nombres_productos[3]},
                        {value:this.cantidad_productos[4], name:this.nombres_productos[4]}
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

    }
}

