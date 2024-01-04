import { PokeApiService } from './../poke-api.service';
import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PokedexComponent implements OnInit{

  maxRecords: number = 151;
  limit: number = 10;
  offset: number = 0;
  pokemonListHtml: string = '';
  pokemonListArray: any[] = [];

  constructor(
    private myPokeService: PokeApiService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadPokemonItens(this.offset,this.limit);
  }

  loadPokemonItens(offset: number, limit: number): Promise<void> {
    return this.myPokeService.getPokemons(offset, limit)
      .then((pokemons: any[] = []) => {
        this.pokemonListArray = [...this.pokemonListArray, ...pokemons];
        console.log(this.pokemonListArray[0].weight);
      })
      .catch((error) => {
        console.error('error loading pokemon data', error);
      });
  }

  loadMore() {
    this.offset += this.limit;
    const qtdRecordsWithNextPage = this.offset + this.limit;
  
    if (qtdRecordsWithNextPage >= this.maxRecords) {
      const newLimit = this.maxRecords - this.offset;
      this.loadPokemonItens(this.offset, newLimit);
  
      // Remove the button after loading the last batch
      const loadMoreButton = document.getElementById('loadMoreButton');
      if (loadMoreButton) {
        loadMoreButton.parentElement?.removeChild(loadMoreButton);
      }
    } else {
      // Load more Pokémon items and update the view
      this.loadPokemonItens(this.offset, this.limit).then(() => {});
    }
  }

  showPokemonsDetails(pokemon:any): void
  {
      const details = this.el.nativeElement.querySelector(`#pokemon-${pokemon.number} .more-details`);
      if (details) {
        details.classList.toggle('show');
    }
  }
}
