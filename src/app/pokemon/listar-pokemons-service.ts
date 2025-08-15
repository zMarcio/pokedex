import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListPokemon } from '../interface/list-pokemon';

@Injectable({
  providedIn: 'root',
})
export class ListarPokemonsMethods {
  public static readonly URLPokemon = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}

  listarPokemons(offset: number = 0, limit: number = 20) {
    const url = `${ListarPokemonsMethods.URLPokemon}?offset=${offset}&limit=${limit}`;
    return this.http.get<ListPokemon>(url);
  }
}
