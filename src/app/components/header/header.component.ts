import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ItemService } from 'src/app/services/item.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private itemService:ItemService,private cookieService:CookieService,private router:Router) { }
  public login:boolean = true;
  public customerName:any = localStorage.getItem('CustomerName')
  public numCart:number = 0
  ngOnInit(): void {
    this.itemService.getCart().then((data:any)=>{
    this.numCart = data.data.items_quantity      
    }).catch((err)=>{
      this.numCart = 0
    })
   if (this.cookieService.get('session_id')) {
    this.login = false;

   } else {
    this.login = true;

   }
  }

  public cerrar(){
    localStorage.clear()
    this.cookieService.delete('session_id')
    this.router.navigate(['login/index'])
  }

}
