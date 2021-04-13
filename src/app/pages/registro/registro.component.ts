import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

public nombre:string = '';
public apellidoM:string = '';
public apellidoP:string = '';
public telefono:string = '';
public ciudad:string = '';
public estado:string='';
public email:string = '';
public password:string = '';
public password2:string = '';

public captchaB:boolean = false;

public emailE:boolean = false;
public emailDE:boolean = false;
public passwordE:boolean = false;
public password2E:boolean = false;
public camposE:boolean = false;
  constructor(private router:Router,private xmlRequest:XMLHttpRequest) { }

  ngOnInit(): void {
  }

  registrar(){
    this.emailE = false;
    this.passwordE = false;
    this.password2E = false;
    this.camposE = false;
    this.emailDE = false;

  let passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})");
  let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!this.nombre || !this.apellidoM || !this.apellidoP || !this.email || !this.password || !this.password2 || !this.estado || !this.ciudad || !this.telefono) {
    this.camposE = true;
  } else{
   if (!this.email.match(emailRegex)) {
     this.emailE = true
   } else {
    if (!this.password.match(passRegex)) {
      this.passwordE = true
    }else{
      if (this.password != this.password2) {
        this.password2E = true
      }else{
        const md5 = new Md5();
        let pass = md5.appendStr(this.password).end()
        pass = pass + 'A'
        let data = {
          address:{
            city:this.ciudad,
            state:this.estado
          },
          first_name:this.nombre,
          middle_name:this.apellidoM,
          last_name:this.apellidoP,
          phone_number:this.telefono,
          email:this.email,
          password:pass,
          password_confirmation:pass
        }
        let xmlRequest = new XMLHttpRequest();
        xmlRequest.open("POST",'http://35.167.62.109/storeutags/security/create_account',false)
        xmlRequest.setRequestHeader('Content-Type','application/json')
        xmlRequest.send(JSON.stringify(data))
        console.log(xmlRequest);
        if (JSON.parse(xmlRequest.response)['status'] == 'error') {
          console.log(JSON.parse(xmlRequest.response)['error_code']);
          if (JSON.parse(xmlRequest.response)['error_code'] == 'DuplicatedAccount') {
            this.emailDE = true
          }else{
            alert('Error al registrarte')
          }
          
        } else {
          console.log(pass);
          
          this.router.navigate(['login/index'])

        }
        

        
      }
      

    }
   }
  }

  
    
  }

  resolved(captchaResponse: string) {
    this.captchaB = true
    
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
