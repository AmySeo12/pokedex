import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { RegistrerComponent } from './registrer/registrer.component';
import { AuthGuard } from './_guards';
const routes: Routes = [
  { path: '', component: PokedexComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrerComponent },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
