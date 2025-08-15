export interface ListPokemon {
  count: number;
  nextUrl: string;
  previousUrl: string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}
