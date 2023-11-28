import { Component } from "@angular/core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartIcon = faCartShopping
}
