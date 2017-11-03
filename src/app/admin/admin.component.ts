import { Component, OnInit } from '@angular/core';
import * as Chart from 'echarts';
import { FirebaseService }          from '../services/firebase.service';
import { Barras } from '../barras';
import { Venta } from '../venta';
import { Lines } from '../lines'
import {BehaviorSubject} from "rxjs";
import {Stack} from '../stack';
import {Data} from '../data'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  echarts = Chart;
  constructor(private firebaseService:FirebaseService) { }
  ventas:any;
  barrasList : Barras[]=[];
  lineasList : Lines[]=[];
  stackList :  Stack[]=[];
  month = ["Ago","Sep","Oct","Nov","Dic"];
  public barraSubject = new BehaviorSubject([]);
  lista: any;
  startDate:string="Ago";
  endDate:string="Dic";
  mesActual:number;
  mesMin: number;
  mesMax: number;

  cantidad_productos:number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  nombres_productos:string[]=[""];
  list_item:any[]=[""];
  dataList: Data[]=[];

  ngOnInit() {
    this.firebaseService.getVentas().subscribe(ventas => {
        this.ventas = ventas;
        this.mesMin = this.monthGenerate(this.startDate);
        this.mesMax = this.monthGenerate(this.endDate);
        this.barrasList=[];
        this.lineasList=[];
        this.stackList=[];
        this.cargarBarras();
        this.loadBarras();
        this.showChartMati();
        this.chargeStack();
        this.terere();
        this.funcionMaricona();
        this.showChart2();
        this.funcionSantiago();
        this.showCharts1();
    });
  }

  cargarBarras(){
    this.ventas.forEach(venta => {
        var fecha = venta.fecha.substr(4,3);
        this.mesActual = this.monthGenerate(fecha);
        if (this.mesActual>=this.mesMin && this.mesActual<=this.mesMax){
            venta.items.forEach(element => {
                let current = this.barraSubject.getValue();
                let dup = current.find(c=>c.name==element.producto);
                if(dup) {
                  for(var i=0;i<this.month.length;i++){
                    if(this.month[i]==fecha ){
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
        }
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
          text: 'Barras Multiples',
          subtext: '(valores acumulados)',
          left:'center'
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
    this.barrasList.forEach(ref=>{
        var ln = new Lines();
        ln.data = ref.data;
        ln.name = ref.name;
        ln.type = 'line';
        for (var i=1; i<ln.data.length;i++)
        {
          ln.data[i]=ln.data[i]+ln.data[i-1];
        }
        this.lineasList.push(ln);
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
    for (var _i = 0; _i < this.cantidad_productos.length-1; _i++)
    {
      var dat = new Data();

      dat.name=this.nombres_productos[_i];
      dat.value=this.cantidad_productos[_i]
      this.dataList.push(dat);
    }
    console.log(this.dataList)
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
                data: this.nombres_productos
            },
            series : [
                {
                    name: 'Cantidad Vendida',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:this.dataList,
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

    chargeStack(){  
      this.barrasList.forEach(ref=>{
        console.log(ref);
        var st = new Stack();
        st.name=ref.name;
        st.data=ref.data;
        st.type='bar';
        this.stackList.push(st);
        console.log(st);
      })
    }

    terere(){
      var Chart4 = this.echarts.init(document.getElementById('grafico4'));
      
          Chart4.setOption({
            title : {
              text: 'Grafico de ventas totales por mes',
              left: 'center'
            },
              tooltip : {
                  trigger: 'axis',
                  axisPointer : {         
                      type : 'shadow'        
                  }
              },
              legend: {
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
                  data: ['ago', 'sep','oct','nov','dic']
              },
              series: this.stackList
          });
    }
    monthGenerate(mesnum){
        switch(mesnum){
            case "Ago":
                return 0;
            case "Sep":
                return 1;
            case "Oct":
                return 2;
            case "Nov":
                return 3;
            case "Dic":
                return 4;
            }
    }
}

