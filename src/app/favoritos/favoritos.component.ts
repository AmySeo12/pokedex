import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, PokedexService, AuthenticationService,UserService } from '../_services';
import { OrderPipe } from 'ngx-order-pipe';
import { first } from 'rxjs/operators';
import { User } from '../_models';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  currentUser: User;
  pokemones=[];
  index= 0;
  total;
  caracteristicas;
  id;
  user;
  nombres= [];
  types;
  active = false;
  constructor(private pokedexService: PokedexService, 
    private alertService: AlertService,
    private orderPipe: OrderPipe,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.id= this.currentUser.id;
    }

  ngOnInit() {
    this.userService.getById(this.id)
    .subscribe(
      data=>{
        this.user= data;
        this.pokemones= data['pokemonsFavorite']
      }
    )
    this.pokedexService.getType()
    .subscribe(
      data=>{
        this.types= data["results"];
      }
    )
  }

  update(pokemon){
    if(this.user["pokemonsFavorite"] == undefined){
      this.user["pokemonsFavorite"]= [];
    }
    if(this.user["pokemonsFavorite"].find( x => x.name == pokemon.name)){
      this.user["pokemonsFavorite"]= this.user["pokemonsFavorite"].filter(x=> {return x.name !== pokemon.name})
    }else{
      this.user["pokemonsFavorite"].push(pokemon);
      this.user["pokemonsFavorite"].filter(x=>{
        x.favorite = true;
      })
    }
    this.userService.update(this.user)
    .pipe(first())
    .subscribe(
        data => {
        },
        error => {
        });
  }

  filtrar(item){
    var name;
    if(item == 'tipo'){
      this.active= true;
    }else{
      this.active= false;
      this.pokemones= this.orderPipe.transform(this.pokemones, 'name');
    }
    
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
