import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { OrderModule } from 'ngx-order-pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistrerComponent } from './registrer/registrer.component';

import { fakeBackendProvider } from './_helpers';


import { AlertComponent } from './_components/alert.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { NamePipe, TypePipe} from './_pipe';
import {OrdePipe } from './_pipe/orde.pipe';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PokemonDetalleComponent } from './pokemon-detalle/pokemon-detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PokedexComponent,
    RegistrerComponent,
    AlertComponent,
    NamePipe,
    TypePipe,
    OrdePipe,
    FavoritosComponent,
    PokemonDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    OrderModule,
    AutocompleteLibModule,
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
