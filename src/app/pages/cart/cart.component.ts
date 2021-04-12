import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ItemService } from 'src/app/services/item.service';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public items: any;
  public itemsPaypal: any = []
  constructor(public cookieService: CookieService, private router: Router, private numCart: HeaderComponent, private itemService: ItemService) { }

  ngOnInit(): void {
    this.getCart();
    this.initConfig();
    this.items.forEach((element: any) => {
      this.itemsPaypal.push({
        name: element.short_description,
        quantity: element.quantity,
        category: 'DIGITAL_GOODS',
        unit_amount: {
          currency_code: 'MXN',
          value: element.total.toFixed(2),
        },
      })
    });
  }

  private initConfig(): void {

    this.payPalConfig = {
      currency: 'MXN',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'MXN',
            value: this.items.total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.items.total.toFixed(2)
              }
            }
          },
          items: this.itemsPaypal
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        actions.order.get().then((details: any) => {
        });

      },
      onClientAuthorization: (data) => {
        this.itemService.createOrder(data).then((resp) => {
          this.router.navigate(['/get_orders'])
        }).catch((err) => {

        })
      },
      onCancel: (data, actions) => {

      },
      onError: err => {
      },
      onClick: (data, actions) => {
      },
    };
  }
  public getCart() {
    this.itemService.getCart().then((data: any) => {
      this.items = data['data']
      this.numCart.numCart = this.items.items_quantity
      if (this.items['items_quantity'] == 0) {
        this.router.navigate(['/index'])
      }

    })
  }
  public deleteItem(id: any) {

    this.itemService.deleteItem(id).then((data) => {
      this.getCart()
    }).catch((err) => {

    })
  }
  public itemUpdate(item_id: any, item_quantity: any) {
    this.itemService.updateItem(item_id, item_quantity).then((data) => {
      this.getCart()
      this.reloadComponent()
    }).catch((err) => {

    })

  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}



