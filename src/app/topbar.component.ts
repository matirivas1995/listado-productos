import { Component, OnInit } from '@angular/core';
import { CartService } from "./services/cart.service";
import { Router }             from '@angular/router';


@Component({
    selector: 'top-bar',
    template: `  
    <div>  
        <nav>
            <div class="nav-wrapper">

                <div class="container">
                    <a class="brand-logo" href="#" >MarketPlace</a>

                    <div *ngIf="sesionIniciada()" class="right">            
                    <button type="button" class="btn btn-default btn-sm" (click)="logout()">
                    <span class="glyphicon glyphicon-log-out"></span></button>
                   </div>  

                        
                    <ul *ngIf="sesionIniciada()" id="nav-mobile" class=" right right hide-on-med-and-down" (click)="toggleCartPopup($event)">
                        <li><i class="material-icons">shopping_cart</i></li>
                        <li><span *ngIf="cart_num">( {{cart_num}} )</span></li>
                    </ul>
                   
                </div>   

                
                <div class="card-floating z-depth-5 ">
                    <cart-popup></cart-popup>
                </div>

            </div>
            
        </nav>
        
    </div>
    
`
})
export class TopbarComponent implements OnInit {
    public collapse: boolean = false;
    public cart_num:number;
    constructor(
        private cartService: CartService,
        private router: Router
    ) { }

    ngOnInit() {
        this.cartService.cartListSubject
        .subscribe(res => {
            this.cart_num = res.length;
        })
    }
    toggleCartPopup = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.cartService.toggleCart()
    }
    sesionIniciada():boolean{
        if(localStorage.getItem('usuario') === null){
          return false;
        }
        else{
          return true;
        }
      }
    
      logout(){
        localStorage.removeItem('usuario');
        this.router.navigate(['']);
      }

}