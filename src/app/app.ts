import { Component, signal } from '@angular/core';
import { ListarPokemons } from './pokemon/listar-pokemons/listar-pokemons';

@Component({
  selector: 'app-root',
  imports: [ListarPokemons],
  templateUrl: './app.html',
  styleUrl: './app.sass',
})
export class App {
  protected readonly title = signal('pokedex');
}
