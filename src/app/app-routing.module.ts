import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { RegistrerComponent } from './registrer/registrer.component';
import { PokemonDetalleComponent } from './pokemon-detalle/pokemon-detalle.component'
import { AuthGuard } from './_guards';
const routes: Routes = [
  { path: '', component: PokedexComponent, canActivate: [AuthGuard], data: { animation: '' } },
  { path: 'favoritos', component: FavoritosComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrerComponent },
  { path: 'pokemon/:id', component: PokemonDetalleComponent, data: { animation: 'pokemon' } }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
