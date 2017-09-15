import {Component, HostBinding, ElementRef} from "@angular/core";
import {CartService} from "./services/cart.service";
import {CartBaseComponent} from "./cart-base.component";
import {FirebaseService} from "./services/firebase.service";

@Component({
    selector: 'cart-popup',
    styleUrls: ["cart-popup.component.css"],
    templateUrl: 'cart-popup.component.html',
    host: {
        '(document:click)': 'onPageClick($event)',
    }
})
export class CartPopupComponent extends CartBaseComponent{
    @HostBinding("class.visible") isVisible:boolean = false;

    constructor(
        protected cartService: CartService,
        private eleref: ElementRef,
        private af:FirebaseService
    ) {
        super(cartService,af);
    }
    ngOnInit() {
        this.cartService.toggleCartSubject.subscribe(res => {
            this.isVisible = res;
        });
    }
    onPageClick = (event) => {
        if (this.isVisible && !this.eleref.nativeElement.contains(event.target) && event.target.className !== 'cart-remove'){
            this.cartService.toggleCart();
        }
    };
}