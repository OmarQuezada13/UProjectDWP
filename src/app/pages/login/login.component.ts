import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import {Md5} from 'ts-md5/dist/md5';
import {CookieService} from 'ngx-cookie-service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,private cookieService:CookieService,private router:Router) { }
public error:string = '';
public email:string = '';
public pass:string = '';
public recordarme:any;

  ngOnInit(): void {
    if (this.cookieService.get('session_id')) {
      this.router.navigate(['/index'])
    }
    if (this.cookieService.get('email') && this.cookieService.get('pass')) {
      this.email = this.cookieService.get('email');
    }
  }

  enviar(){
    const md5 = new Md5();
    let password = md5.appendStr(this.pass).end()
    password = password + 'A'
    this.peticion(this.email,password)
}



public peticion(email:string,pass:string){
      let data = {
        email:email,
        password:pass
      }
      let xmlRequest = new XMLHttpRequest();
        xmlRequest.open("POST",'http://35.167.62.109/storeutags/security/login',false)
        xmlRequest.setRequestHeader('Content-Type','application/json')
        xmlRequest.send(JSON.stringify(data))
        console.log(xmlRequest);
        if (JSON.parse(xmlRequest.response)['status'] == 'error') {
          this.error = "Usuario y/ó contraseña incorrectos"
        }else{
          if (this.recordarme) {
            this.cookieService.set('email',this.email)
            this.cookieService.set('pass',pass)
          }
          this.cookieService.set('session_id',JSON.parse(xmlRequest.response)['data']['session_id']) 
          localStorage.setItem('CustomerName', JSON.parse(xmlRequest.response)['data']['customer']['full_name'])
          if (this.route.snapshot.params['p'].includes('-')) {
          let split =  this.route.snapshot.params['p'].split('-');
          this.router.navigate([split[0]+"/"+split[1]])
          }else{
            this.router.navigate([ this.route.snapshot.params['p'] ])

          }
          
        }
}

  }


