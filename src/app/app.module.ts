import { ItemComponent } from './pages/item/item.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecaptchaModule } from "ng-recaptcha";
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { PassRecoveryComponent } from './pages/PassRecovery/pass-recovery/pass-recovery.component';
import { PassCodeComponent } from './pages/PassRecovery/pass-code/pass-code.component';
import { PassNewComponent } from './pages/PassRecovery/pass-new/pass-new.component';
import {CookieService} from 'ngx-cookie-service';
import { IndexComponent } from './pages/index/index.component'
import {HttpClientModule} from '@angular/common/http';
import { CartComponent } from './pages/cart/cart.component'
import { NgxPayPalModule } from 'ngx-paypal';
import { GetOrdersComponent } from './pages/get-orders/get-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegistroComponent,
    LoginComponent,
    PassRecoveryComponent,
    PassCodeComponent,
    PassNewComponent,
    IndexComponent,
    ItemComponent,
    CartComponent,
    GetOrdersComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPayPalModule,
  ],
  providers: [XMLHttpRequest,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
