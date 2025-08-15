import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPokemons } from './listar-pokemons';

describe('ListarPokemons', () => {
  let component: ListarPokemons;
  let fixture: ComponentFixture<ListarPokemons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPokemons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPokemons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
