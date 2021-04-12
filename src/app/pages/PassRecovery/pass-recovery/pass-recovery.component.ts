import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.component.html',
  styleUrls: ['./pass-recovery.component.css']
})
export class PassRecoveryComponent implements OnInit {

  constructor(private router:Router) { }

public email:string = '';
public emailE:boolean = false;

  ngOnInit(): void {
  }


enviar(){
  this.emailE = false
  let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!this.email) {
    this.emailE = true
  }else{
    if (!this.email.match(emailRegex)) {
      this.emailE = true
    }
    else{
      let data = {
        email:this.email
      }
      let xmlRequest = new XMLHttpRequest();
        xmlRequest.open("POST",'http://35.167.62.109/storeutags/security/request_recovery_code',false)
        xmlRequest.setRequestHeader('Content-Type','application/json')
        xmlRequest.send(JSON.stringify(data))
        console.log(xmlRequest);
        if (JSON.parse(xmlRequest.response)['status'] == 'error') {
          console.log(JSON.parse(xmlRequest.response)['error_code']);
          
          
        }else{

          this.router.navigate(['/pass/code'])
          localStorage.setItem('email',this.email)
        }

    }

  }
}


}
