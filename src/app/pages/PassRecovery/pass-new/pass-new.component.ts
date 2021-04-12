import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-pass-new',
  templateUrl: './pass-new.component.html',
  styleUrls: ['./pass-new.component.css']
})
export class PassNewComponent implements OnInit {

  constructor(private router:Router) { }
  public password:string = '';
  public password2:string = '';
  public passwordE:boolean = false;
  public password2E:boolean = false;

  ngOnInit(): void {
  }
enviar(){
  this.passwordE = false;
  this.password2E = false;
let passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})");

  if (!this.password) {
    this.passwordE = true;
  } else {
    if (!this.password2) {
      this.password2E = true;
    }else{
      if (!this.password.match(passRegex)) {
        this.passwordE = true;
      }else{
        if (this.password2 != this.password) {
          this.password2E = true
        }else{
          const md5 = new Md5();
          let pass = md5.appendStr(this.password).end()
          pass = pass + 'A'
          let data = {
            email:localStorage.getItem('email'),
            recovery_code:localStorage.getItem('code'),
            password:pass,
            password_confirmation:pass
          }
          let xmlRequest = new XMLHttpRequest();
            xmlRequest.open("POST",'http://35.167.62.109/storeutags/security/update_password',false)
            xmlRequest.setRequestHeader('Content-Type','application/json')
            xmlRequest.send(JSON.stringify(data))
            console.log(xmlRequest);
            if (JSON.parse(xmlRequest.response)['status'] == 'error') {
              console.log(JSON.parse(xmlRequest.response)['error_code']);
              alert('Error de Servidor')
            }else{
              this.router.navigate(['login'])
              
            }

        }

      }

    }

  }
}
}
