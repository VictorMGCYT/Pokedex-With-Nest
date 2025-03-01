import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios

  async executeSeed(){
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=20  ')

    const pokemons: {name: string, id: string}[]  = []
    data.results.forEach( ({name, url}) => {
      const segments = url.split('/');
      const id = segments[6];
      
      pokemons.push({name, id})

    })
    console.log(pokemons);
    return data.results;
  }
  
}
