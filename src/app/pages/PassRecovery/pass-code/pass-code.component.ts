import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass-code',
  templateUrl: './pass-code.component.html',
  styleUrls: ['./pass-code.component.css']
})
export class PassCodeComponent implements OnInit {

  constructor(private router:Router) { }
public codigo:string = '';
public codigoE:boolean = false;
  ngOnInit(): void {
  }

  enviar(){
    this.codigoE = false
    if (!this.codigo) {
      this.codigoE = true;
    }else{
      let data = {
        email:localStorage.getItem('email'),
        recovery_code:this.codigo
      }
      let xmlRequest = new XMLHttpRequest();
        xmlRequest.open("POST",'http://35.167.62.109/storeutags/security/validate_recovery_code',false)
        xmlRequest.setRequestHeader('Content-Type','application/json')
        xmlRequest.send(JSON.stringify(data))
        console.log(xmlRequest);
        if (JSON.parse(xmlRequest.response)['status'] == 'error') {
          console.log(JSON.parse(xmlRequest.response)['error_code']);
          this.codigoE = true
        }else{
          this.router.navigate(['/pass/new'])
          localStorage.setItem('code',this.codigo)
          
        }

    }
  }

}
