import {CartService} from "./services/cart.service";
import {Cart} from "./cart";
import {FirebaseService} from "./services/firebase.service";
import {Venta} from './venta';
import {Item} from './item';



export class CartBaseComponent{
    public cartList:Cart[];
    public totalPrice: number;
    public venta: Venta;
    public itemList:Item[]=[];
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
        this.venta = new Venta();
        for(let cart of this.cartList) {
            var item = new Item();
            item.cantidad=cart.quantity;
            item.producto=cart.producto.name;
            item.precio=cart.producto.precio*cart.quantity;
            item.id=cart.producto.id;
            cart.producto.cantidad = cart.producto.cantidad - cart.quantity;
            alert("Compra realizada con exito")
            this.firebaseService.updateProducto(cart.producto.id,cart.producto);  
            this.itemList.push(item);       
        }
        this.venta.items=this.itemList;
        this.venta.total=this.totalPrice;
        const currentDate = (new Date()).toString();
        this.venta.fecha=currentDate;
        console.log(this.venta);
        this.firebaseService.setVentas(this.venta);
        this.cartList.length=0;
        this.cartService.reloadCart(this.cartList);
    };
}