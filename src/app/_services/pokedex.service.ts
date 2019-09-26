import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class PokedexService {
    constructor(private http: HttpClient) { }

    getAll(inicio:number) {
        return this.http.get(`${environment.pokedex}/pokemon?offset=${inicio}&limit=20`);
    }

    getCharacteristicsAll(url:string){
        return this.http.get(`${environment.pokedex}/pokemon/${url}`)
    }

    getType() {
        return this.http.get(`${environment.pokedex}/type`);
    }

    getTypeId(name){
        return this.http.get(`${environment.pokedex}/type/${name}`);
    }


    getSpecies(id) {
        return this.http.get(`${environment.pokedex}/pokemon-species/${id}`);
    }

    getGender(id) {
        return this.http.get(`${environment.pokedex}/gender/${id}`);
    }

    getEvolution(id) {
        return this.http.get(`${id}`);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }

}