import {CartService} from "./services/cart.service";
import {Cart} from "./cart";



export class CartBaseComponent{
    public cartList:Cart[];
    public totalPrice: number;
    constructor(protected cartService: CartService) {
        this.loadCart();
    }
    loadCart = () => {
        this.cartService.cartListSubject
            .subscribe(res => {
                this.cartList = res;
                console.log(this.cartList);
                let total = 0;
                for(let cart of this.cartList) {
                    
                    total += cart.producto.precio * cart.quantity;
                    console.log(cart.producto.precio);
                }
                console.log(total);
                this.totalPrice = total;
                console.log(this.totalPrice);
            })

    };
    removeFromCart = index => {
        this.cartService.removeCart(index);
    };
}