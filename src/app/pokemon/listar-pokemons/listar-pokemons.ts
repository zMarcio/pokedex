import { Component } from '@angular/core';
import { ListarPokemonsMethods } from '../listar-pokemons-service';
import { ListPokemon, PokemonResult } from '../../interface/list-pokemon';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-listar-pokemons',
  imports: [CommonModule, CardModule, ProgressSpinnerModule],
  templateUrl: './listar-pokemons.html',
  styleUrl: './listar-pokemons.sass',
})
export class ListarPokemons {
  public pokemons: PokemonResult[] = [];
  public paginaAtual: number = 0;
  public limit: number = 20;
  public carregando: boolean = false;
  constructor(private listarPokemonsMethods: ListarPokemonsMethods) {}

  ngOnInit() {
    this.chamarListarPokemons();
  }

  carregarPokemons() {
    this.chamarListarPokemons();
  }

  proximaPagina() {
    this.paginaAtual = this.paginaAtual + 1;
    this.carregarPokemons();
  }

  voltarPagina() {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.carregarPokemons();
    }
  }

  chamarListarPokemons() {
    this.carregando = true;
    return setTimeout(() => {
      this.listarPokemonsMethods
        .listarPokemons(this.paginaAtual * this.limit, this.limit)
        .pipe(
          tap((response: ListPokemon) => {
            this.pokemons = response.results;
          })
        )
        .subscribe({
          next: (data: ListPokemon) => {
            this.pokemons = data.results;
          },
          error: (error) => {
            console.error('Error fetching pokemons:', error);
          },
          complete: () => {
            this.carregando = false;
          },
        });
    }, 1000);
  }
}
