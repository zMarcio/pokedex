export interface ListPokemon {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonSprite {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: PokemonSprite;
  height: number;
  weight: number;
}
