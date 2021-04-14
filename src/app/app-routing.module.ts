import { ItemComponent } from './pages/item/item.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { PassCodeComponent } from './pages/PassRecovery/pass-code/pass-code.component';
import { PassNewComponent } from './pages/PassRecovery/pass-new/pass-new.component';
import { PassRecoveryComponent } from './pages/PassRecovery/pass-recovery/pass-recovery.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CartComponent } from './pages/cart/cart.component';
import { GetOrdersComponent } from './pages/get-orders/get-orders.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'index',component:IndexComponent},
  {path:'signUp', component:RegistroComponent},
  {path:'login/:p', component:LoginComponent},
  {path:'pass/send', component:PassRecoveryComponent},
  {path:'pass/code', component:PassCodeComponent},
  {path:'pass/new', component:PassNewComponent},
  {path:'item/:p' , component:ItemComponent},
  {path:'cart', component:CartComponent},
  {path:'get_orders', component:GetOrdersComponent},
  {path:'checkOut', component:CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
