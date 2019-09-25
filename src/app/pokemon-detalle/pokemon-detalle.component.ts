import { Component, OnInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertService, PokedexService, AuthenticationService,UserService } from '../_services';


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
    
    .subscribe(data=>{
      this.pokemon= data;
      this.img= data['sprites']['front_default'];
      this.show= true;
      console.log(data);
    })
  }

}
