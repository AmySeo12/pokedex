import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, PokedexService, AuthenticationService,UserService } from '../_services';
import { OrderPipe } from 'ngx-order-pipe';
import { first } from 'rxjs/operators';
import { User } from '../_models';

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
      }
    )
    this.cargarPage(this.index);
    this.pokedexService.getType()
    .subscribe(
      data=>{
        this.types= data["results"];
      }
    )
  }

  cargarPage(indice){
    this.pokedexService.getAll(indice)
    .subscribe(
        data => {
            var url= '';
            this.user['pokemonsFavorite'].filter(x=>{
              x.favorite= true;
            })
            this.total= data['count'];
            this.pokemonesTemporal= data["results"];
            this.pokemonesTemporal= this.orderPipe.transform(this.pokemonesTemporal, 'name');
            for(var i= 0; i < this.pokemonesTemporal.length; i++){
              url= this.pokemonesTemporal[i].name;
              this.nombres.push(url);
              this.pokedexService.getCharacteristicsAll(url)
              .subscribe(
                info=>{
                  info["typeName"]=[];
                  if(this.user.pokemonsFavorite){
                    this.user.pokemonsFavorite.find(x=>{
                      if(x.name == info["name"]){
                        info = x;
                      }
                    })
                  }
                  
                  info["types"].find(x=>{
                    info["typeName"].push(x['type'].name)
                  })
                  this.pokemones.push(info);
                }
              )
            }
            this.pokemones= this.orderPipe.transform(this.pokemones, 'name');
        },
        error => {
            this.alertService.error(error);
        });
  }

  onScroll(){
    this.index += 20;
    console.log(this.total)
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
      this.user.pokemonsFavorite.filter(x=>{
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
