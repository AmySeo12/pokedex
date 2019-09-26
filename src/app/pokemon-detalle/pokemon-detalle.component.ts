import { Component, OnInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertService, PokedexService, AuthenticationService,UserService } from '../_services';
import { filter } from 'rxjs/internal/operators/filter';


@Component({
  selector: 'app-pokemon-detalle',
  templateUrl: './pokemon-detalle.component.html',
  styleUrls: ['./pokemon-detalle.component.css'],
  providers: [NgbProgressbarConfig]
})
export class PokemonDetalleComponent implements OnInit {

  id;
  pokemon={};
  img= "";
  show:boolean= false;
  descripcion;
  genre=[];
  abilities;
  categoria;
  evoluciones=[];
  datosEvolucion=[];
  linkEvolucion;
  differencesGender:boolean;
  weakness=[];
  constructor(config: NgbProgressbarConfig, 
    private pokedexService: PokedexService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.pokedexService.getCharacteristicsAll(this.id)
    .subscribe(caracteristicas=>{
      this.pokemon= caracteristicas;
      this.abilities= caracteristicas["abilities"];
      this.pokedexService.getSpecies(this.id)
      .subscribe(especie=>{
        especie["flavor_text_entries"].find(y=>{
          if(y["language"]["name"] == 'es'){
            this.descripcion= y["flavor_text"];
          }
        })
        especie["genera"].find(y=>{
          if(y["language"]["name"] == "es"){
            this.categoria= y["genus"];
          }
        })
        this.linkEvolucion= especie["evolution_chain"]["url"];
        this.differencesGender= especie["has_gender_differences"];
        
        this.pokedexService.getEvolution(this.linkEvolucion)
        .subscribe(evolution=>{
          this.evoluciones.push(evolution["chain"]["species"]["name"])
            this.evoution(evolution["chain"]["evolves_to"], "evolves_to", this.evoluciones,"species","name");
            for(var i= 0; i < this.evoluciones.length; i++){
              this.pokedexService.getCharacteristicsAll(this.evoluciones[i])
              .subscribe(data=>{
                var datos= {
                  "name": data["name"],
                  "img": data["sprites"]["front_default"]
                }
                this.datosEvolucion.push(datos);
              })
            }
            this.pokedexService.getGender("1")
            .subscribe(x=>{
              x["pokemon_species_details"].find(y=>{
                if(y["pokemon_species"]["name"] == this.pokemon["name"]){
                  this.genre.push("female");
                }
              })
            this.pokedexService.getGender("2")
            .subscribe(genre =>{
              genre["pokemon_species_details"].find(y=>{
                if(y["pokemon_species"]["name"] == this.pokemon["name"]){
                  this.genre.push("male");
                }
              })
            })
            this.pokedexService.getGender("3")
            .subscribe(genre =>{
              genre["pokemon_species_details"].find(y=>{
                if(y["pokemon_species"]["name"] == this.pokemon["name"]){
                  this.genre.push("ambos");
                }
              })
            })
            var typesW=[];
            for(var i= 0; i < this.pokemon['types'].length; i++){
              this.pokedexService.getTypeId(this.pokemon['types'][i]['type']['name'])
              .subscribe(type=>{
                type["damage_relations"]["double_damage_from"].find(x=>{
                  datos(0,x["name"], this.pokemon["types"], "type", typesW, "name")
                  console.log(x["name"])
                })
                
              })
            }
              this.weakness = typesW;
              this.show=true;
            })

        })
        var variante= 0;
        function datos(variante, x, arr, prop, variable, prop2){
          if(arr[variante]){
            if(prop2.length > 0){
              if(arr[variante][prop][prop2] != x ){
                variable.push(x);
              }
            }else{
              if(arr[variante][prop] == x ){
                variable.push(arr[variante]);
              }
            }
            variante++
          }
        }
        var pokemonTemporal= [];
        this.evoluciones.filter(x=>{
          datos(variante, x, this.datosEvolucion, "name", pokemonTemporal, "");
        })
        this.datosEvolucion = pokemonTemporal;
      })
    })
  }

  evoution(arr, prop, arrC,propN, propT){
    var first= arr[0]
    if(arr.length > 0){
      arrC.push(arr[0][propN][propT]);
      this.evoution(arr[0][prop], prop, arrC, propN, propT);
    }
  }

}
