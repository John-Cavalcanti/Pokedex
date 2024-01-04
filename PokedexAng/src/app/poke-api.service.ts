import { Injectable } from '@angular/core';
import { Pokemon } from 'src/models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor() {
    this.getPokemonDetail = this.getPokemonDetail.bind(this);
  }

  private convertPokeApiDetailToPokemon(pokeDetail: any): Pokemon
  {
    const pokemon = new Pokemon(
      pokeDetail.id,
      pokeDetail.name,
      pokeDetail.sprites.other.dream_world.front_default,
      pokeDetail.base_experience,
      pokeDetail.height,
      pokeDetail.weight,
      pokeDetail.types.map((typeSlot: any) => typeSlot.type.name))
      
      return pokemon;
  }

  private getPokemonDetail(pokemon: any): Promise<any>
  {
    return fetch(pokemon.url)
      .then((Response) => Response.json())
      .then(this.convertPokeApiDetailToPokemon)
  }
  
  public getPokemons(offset: number = 0, limit:number = 0): Promise<any>
  {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(this.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
  }
  
}
