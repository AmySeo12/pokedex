import { ArrayType } from "@angular/compiler/src/output/output_ast";

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    pokemonsFavorite: Array<any>;
}