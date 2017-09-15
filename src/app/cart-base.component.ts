import {CartService} from "./services/cart.service";
import {Cart} from "./cart";
import {FirebaseService} from "./services/firebase.service";



export class CartBaseComponent{
    public cartList:Cart[];
    public totalPrice: number;
    constructor(protected cartService: CartService,private firebaseService:FirebaseService) {
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

                }
                this.totalPrice = total;

            })

    };
    removeFromCart = index => {
        this.cartService.removeCart(index);
    };

    checkout () {
        for(let cart of this.cartList) {
            cart.producto.cantidad = cart.producto.cantidad - cart.quantity;
            alert("Compra realizada con exito")
            this.firebaseService.updateProducto(cart.producto.id,cart.producto);         
        }
        this.cartList.length=0;
        this.cartService.reloadCart(this.cartList);
    };
}