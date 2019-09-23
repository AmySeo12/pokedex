import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, PokedexService, AuthenticationService,UserService } from '../_services';
import { OrderPipe } from 'ngx-order-pipe';
import { first } from 'rxjs/operators';
import { url } from 'inspector';
import { User } from '../_models';
import { type } from 'os';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  currentUser: User;
  pokemones=[];
  pokemonesTemporal=[];
  index= 0;
  total;
  caracteristicas;
  id;
  user;
  nombres= [];
  types;
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
    this.cargarPage(this.index);
    this.userService.getById(this.id)
    .subscribe(
      data=>{
        this.user= data;
      }
    )
    this.pokedexService.getType()
    .subscribe(
      data=>{
        this.types= data.results;
        console.log(this.types)
      }
    )
  }

  cargarPage(indice){
    this.pokedexService.getAll(indice)
    .subscribe(
        data => {
            this.alertService.success('Registration successful', true);
            var url= '';
            this.total= data.count;
            this.pokemonesTemporal= data.results
            this.pokemonesTemporal= this.orderPipe.transform(this.pokemonesTemporal, 'name');
            for(var i= 0; i < this.pokemonesTemporal.length; i++){
              url= this.pokemonesTemporal[i].name;
              this.nombres.push(url);
              this.pokedexService.getCharacteristicsAll(url)
              .subscribe(
                info=>{
                  info.typeName=[];
                  this.user.pokemonsFavorite.find(x=>{
                    if(x.name == info.name){
                      info.favorite= true;
                    }else{
                      info.favorite= false;
                    }
                  })
                  info.types.find(x=>{
                    info.typeName.push(x['type'].name)
                  })
                  this.pokemones.push(info);
                }
              )
            }
            this.pokemones= this.orderPipe.transform(this.pokemones, 'name');
            console.log(this.pokemones)
        },
        error => {
            this.alertService.error(error);
        });
  }

  onScroll(){
    this.index += 20;
    if(this.index < this.total){
      this.cargarPage(this.index);
    }

  }

  update(pokemon){
    if(this.user.pokemonsFavorite == undefined){
      this.user.pokemonsFavorite= [];
    }
    if(this.user.pokemonsFavorite.find( x => x.name == pokemon.name)){
      this.user.pokemonsFavorite= this.user.pokemonsFavorite.filter(x=> {return x.name !== pokemon.name})
    }else{
      this.user.pokemonsFavorite.push(pokemon);
    }
    this.userService.update(this.user)
    .pipe(first())
    .subscribe(
        data => {
            this.alertService.success('Registration successful', true);
            console.log('Si entre');
        },
        error => {
            this.alertService.error(error);
        });
  }

  filtrar(item){
    var name;
    if(item == 'name'){
      this.pokemones= this.orderPipe.transform(this.pokemones, 'name');
    }else{
      this.pokemones
      .find(x=>{
        x.types.find(y=>{
          console.log(y['type'].name);
        })
      })
    }
    
  }
  filtro(value){
    console.log(value)
    return this.pokemones.find(x=>{
      return x.typeName.find(y=>{
        return y == value;
      })
    })
    //return it.typeName[0] == terms;
  }

}
