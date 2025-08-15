import { TestBed } from '@angular/core/testing';

import { ListarPokemonsMethods } from './listar-pokemons-service';

describe('ListarPokemonsMethods', () => {
  let service: ListarPokemonsMethods;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarPokemonsMethods);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
