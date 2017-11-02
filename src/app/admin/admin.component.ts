import { Component, OnInit } from '@angular/core';
import * as Chart from 'echarts';
import { FirebaseService }          from '../services/firebase.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  echarts = Chart;
  constructor(private firebaseService:FirebaseService) { }
  ventas:any;
  cantidad_productos:number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  nombres_productos:string[]=[""];
  list_item:any[]=[""];

  ngOnInit() {
    this.firebaseService.getVentas().subscribe(ventas => {
        this.ventas = ventas;
        console.log(ventas);
        this.funcionSantiago();
        this.showCharts1();
    });

    
    var Chart2 = this.echarts.init(document.getElementById('grafico2'));
    var Chart3 = this.echarts.init(document.getElementById('grafico3'));
    var Chart4 = this.echarts.init(document.getElementById('grafico4'));

    
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
            left: 'left',
            data: ['jamon', 'queso']
        },
        xAxis: {
            type: 'category',
            name: 'x',
            splitLine: {show: false},
            data: ['en', 'feb', 'mar', 'ab', 'may', 'jun', 'jul', 'agos', 'sept']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'log',
            name: 'y'
        },
        series: [
            {
                name: 'pan',
                type: 'line',
                data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]
            },
            {
                name: 'jamon',
                type: 'line',
                data: [1, 2, 4, 8, 16, 32, 64, 128, 256]
            },
            {
                name: 'queso',
                type: 'line',
                data: [1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128, 1/256, 1/512]
            }
        ]
    });

    Chart3.setOption({
        title : {
            text: 'Grafico de Barras Multiples',
            subtext: '(valores acumulados)'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['jamon','queso']
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
                data : ['en','feb','mar','abr','may','jun','jul','ago','sept','oct','nov','dic']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'jamon',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'queso',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint : {
                    data : [
                        {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                        {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    });

    Chart4.setOption({
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
    console.log("nombres de los productos")
    console.log(this.nombres_productos)//se obtiene los nombres de los productos

    ///////////////////////////////////////
    this.ventas.forEach(venta=>{
        venta.items.forEach(item=>{
            this.list_item.push(item)
        })
            })
    console.log(this.list_item)
    //////////////////////////////////////
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
    console.log("Resultado:")
    console.log(this.nombres_productos);
    console.log(this.cantidad_productos);
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
