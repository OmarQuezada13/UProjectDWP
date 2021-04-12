import { ItemService } from './../../services/item.service';
import { BuscadorService } from './../../services/buscador.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  constructor(private cookieService: CookieService,private router: Router,private buscador:BuscadorService, private route: ActivatedRoute, private itemService: ItemService) { }
  public item: any = { short_description: '', html_details: '' }
  public items: any;
  public cantidad: number = 1
  public total: number = 0
  ngOnInit(): void {
    
    this.buscador.getItemByCategory('').then((data:any)=>{
      
      this.items = data.data.items
    })
    this.itemService.getItem(this.route.snapshot.params['p']).then((data: any) => {
      this.item = data.data.items[0]
      this.total = data.data.items[0]['price']
      console.log(
        this.item
      );
    });
  }
  public cantidadItem(number: number) {
    this.total = (number * this.item['price']);
  }
  public addCart(item_id: string, cantidad: number) {
    console.log(this.cookieService.get('session_id'));
    
    if (this.cookieService.get('session_id')) {
      this.itemService.addCart(item_id, cantidad).then((data) => {
        console.log(data);
        this.router.navigateByUrl('/index', { skipLocationChange: true }).then(() => {
          this.router.navigate(['index']);
        });
      });
    } else {
      this.router.navigate(['/login/item-'+item_id]);

    }
 
  }
}
