import { Component, OnInit } from '@angular/core';
import { ListarPokemonsMethods } from '../listar-pokemons-service';
import { ListPokemon, PokemonResult, PokemonDetail } from '../../interface/list-pokemon';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-listar-pokemons',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ProgressSpinnerModule,
    PaginatorModule,
    AutoCompleteModule,
    ButtonModule,
  ],
  templateUrl: './listar-pokemons.html',
  styleUrl: './listar-pokemons.sass',
})
export class ListarPokemons implements OnInit {
  public pokemons: (PokemonResult & { detail?: PokemonDetail })[] = [];
  public paginaAtual: number = 0;
  public limit: number = 20;
  public carregando: boolean = false;
  public first: number = 0;
  public rows: number = 20;
  public totalRecords: number = 1302;
  public selectedPokemon: PokemonResult | null = null;
  public filteredPokemons: PokemonResult[] = [];
  public allPokemons: PokemonResult[] = [];

  // Propriedades para controle de busca
  public isFiltered: boolean = false;
  public searchedPokemon: (PokemonResult & { detail?: PokemonDetail }) | null = null;

  constructor(private listarPokemonsMethods: ListarPokemonsMethods) {}

  ngOnInit() {
    this.carregarPokemons();
    this.storeAllPokemons();
  }

  storeAllPokemons() {
    this.listarPokemonsMethods.listarPokemons(0, 1302).subscribe({
      next: (data: ListPokemon) => {
        this.allPokemons = data.results;
      },
      error: (error: any) => {
        console.error('Error fetching all pokemons:', error);
      },
    });
  }

  carregarPokemons() {
    this.carregando = true;
    this.first = this.paginaAtual * this.limit;

    this.listarPokemonsMethods.listarPokemons(this.paginaAtual * this.limit, this.limit).subscribe({
      next: (data: ListPokemon) => {
        this.pokemons = data.results;
        this.totalRecords = data.count;
        this.carregarSprites();
      },
      error: (error: any) => {
        console.error('Error fetching pokemons:', error);
        this.carregando = false;
      },
    });
  }

  carregarSprites() {
    if (this.pokemons.length === 0) {
      this.carregando = false;
      return;
    }

    const spriteRequests = this.pokemons.map((pokemon) => {
      const id = Number(pokemon.url.split('/')[6]);
      return this.listarPokemonsMethods.listarSpritePokemon(id);
    });

    forkJoin(spriteRequests).subscribe({
      next: (details: PokemonDetail[]) => {
        this.pokemons = this.pokemons.map((pokemon, index) => ({
          ...pokemon,
          detail: details[index],
        }));
      },
      error: (error: any) => {
        console.error('Error fetching sprites:', error);
      },
      complete: () => {
        this.carregando = false;
      },
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginaAtual = Math.floor(event.first / event.rows);
    this.carregarPokemons();
  }

  filterPokemon(event: any) {
    const query = event.query.toLowerCase();

    this.filteredPokemons = this.allPokemons.filter((pokemon: PokemonResult) =>
      pokemon.name.toLowerCase().includes(query)
    );
  }

  onPokemonSelect(event: any) {
    const selectedPokemon = event.value;
    if (selectedPokemon) {
      this.carregarPokemonEspecifico(selectedPokemon);
    }
  }

  carregarPokemonEspecifico(pokemon: PokemonResult) {
    this.carregando = true;
    this.isFiltered = true;

    const id = Number(pokemon.url.split('/')[6]);

    this.listarPokemonsMethods.listarSpritePokemon(id).subscribe({
      next: (detail: PokemonDetail) => {
        this.searchedPokemon = {
          ...pokemon,
          detail: detail,
        };
      },
      error: (error: any) => {
        console.error('Error fetching selected pokemon:', error);
      },
      complete: () => {
        this.carregando = false;
      },
    });
  }

  clearFilter() {
    this.isFiltered = false;
    this.searchedPokemon = null;
    this.selectedPokemon = null;
  }

  voltarParaLista() {
    this.clearFilter();
  }
}
