import { Component, OnInit }    from '@angular/core';
import { CartService }          from "./services/cart.service";
import { AuthService }          from './services/auth.service';



@Component({
    selector: 'top-bar',
    template: `  
    <div>  
        <nav>
            <div class="nav-wrapper">

                <div class="container">
                     
                    <a class="brand-logo" href="#" ><i class="material-icons">shopping_basket</i>MarketPlace</a>

                    <div *ngIf="authService.isSignedInStream | async"  class="right">            
                    <button type="button" class="btn btn-default btn-sm red lighten-2 hover" (click)="logout()">
                    <span class="glyphicon glyphicon-log-out"></span></button>
                   </div>  

                    <div *ngIf="authService.isSignedInStream | async" class="right" >    
                        <button type="button" class="btn btn-default btn-sm red lighten-2" (click)="toggleCartPopup($event)">
                        <span class="glyphicon glyphicon-shopping-cart"></span>
                        <span *ngIf="cart_num">( {{cart_num}} )</span>
                        </button>
                    </div>
                   
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
        private authService:AuthService
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
   
    logout(){
    this.authService.firebaseSignOut();
    }

}