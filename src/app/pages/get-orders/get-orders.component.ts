import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrls: ['./get-orders.component.css']
})
export class GetOrdersComponent implements OnInit {
public orders:any[] = []
  constructor( private itemService:ItemService) { }

  ngOnInit(): void {
    this.itemService.getOrders().then((data:any)  =>{
      console.log(data);
      this.orders = data.data.orders;
      
    })
  }

}
