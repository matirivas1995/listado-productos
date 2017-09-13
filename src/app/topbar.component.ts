import { Component, OnInit } from '@angular/core';
import { CartService } from "./services/cart.service";


@Component({
    selector: 'top-bar',
    template: `  
    <div>  
        <nav>
            <div class="nav-wrapper">
                <div class="container">
                    <a class="brand-logo" href="#" >MarketPlace</a>
                    <ul id="nav-mobile" class=" right right hide-on-med-and-down">
                        <li><i class="material-icons">shopping_cart</i></li>
                        <li><span *ngIf="cart_num">( {{cart_num}} )</span></li>
                    </ul>
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
        private cartService: CartService
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
}