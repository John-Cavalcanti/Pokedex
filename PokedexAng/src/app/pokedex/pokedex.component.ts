import { PokeApiService } from './../poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit{

  maxRecords: number = 151;
  limit: number = 10;
  offset: number = 0;
  pokemonListHtml:string = '';

  constructor(
    private myPokeService: PokeApiService
  ) {}

  ngOnInit(): void {
    this.loadPokemonItens(this.offset,this.limit);
  }

  convertPokemonToLi(pokemon: any): string {
    return `
            <li class="pokemon ${pokemon.type}">
                
                <div class="detail">
                    
                    <div class ="header">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
                        <div class="main-details">
                            <ol class="types">
                                ${pokemon.types.map((type:any) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>

                            <img src="${pokemon.photo}"
                                alt="${pokemon.name}">
                        </div>
                    </div>

                    <div class="more-details">
                        <h3>Mais detalhes de ${pokemon.name}</h3>
                        <div class="info-extra">
                            <span> XP Base </span>
                            <p>${pokemon.base_xp}</p>
                        </div>

                        <div class="info-extra">
                            <span> Altura </span>
                            <p>${pokemon.height}</p>
                        </div>

                        <div class="info-extra">
                            <span> Peso em hectogramas </span>
                            <p>${pokemon.weight}</p>
                        </div>
                        
                    </div>
                </div>
            </li>
        `
  }

  loadPokemonItens(offset:number ,limit:number): void
  {
    this.myPokeService.getPokemons(offset,limit)
    .then((pokemons:any[] = []) => 
    {
      const newHtml = pokemons.map(this.convertPokemonToLi).join('');
      this.pokemonListHtml += newHtml;
    })
    .catch((error) => {
      console.error('error loading pokemon data', error)
    })
  }

  loadMore()
  {
    this.offset += this.limit;
    const qtdRecordsWithNextPage = this.offset + this.limit;

    if(qtdRecordsWithNextPage >= this.maxRecords)
    {
      const newLimit = this.maxRecords - this.offset;
      this.loadPokemonItens(this.offset, newLimit);

      const loadMoreButton = document.getElementById('loadMoreButton');
      if(loadMoreButton)
      {
        loadMoreButton.parentElement?.removeChild(loadMoreButton);
      }
      else 
      {
        this.loadPokemonItens(this.offset,this.limit);
      }
    }
  }

}
