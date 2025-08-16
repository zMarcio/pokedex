import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListPokemon } from '../interface/list-pokemon';

@Injectable({
  providedIn: 'root',
})
export class ListarPokemonsMethods {
  public static readonly URLPokemonName = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}

  listarPokemons(offset: number = 0, limit: number = 20) {
    const url = `${ListarPokemonsMethods.URLPokemonName}?offset=${offset}&limit=${limit}`;
    return this.http.get<ListPokemon>(url);
  }

  listarSpritePokemon(countIdPokemon: number) {
    const url = `${ListarPokemonsMethods.URLPokemonName}/${countIdPokemon}`;
    return this.http.get<any>(url);
  }
}
