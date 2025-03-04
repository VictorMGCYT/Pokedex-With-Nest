import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {

  constructor(
      @InjectModel( Pokemon.name )
      private readonly pokemonModel: Model<Pokemon>,

      private readonly http: AxiosAdapter
    ){
  
    }

  async executeSeed(){

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const pokemons: {name: string, no: number}[] = data.results.map( ({name, url}) => {
      const segments = url.split('/');
      const no: number = +segments[6];
      
      return ({name, no})
    })
    console.log(pokemons);

    const resul = await this.pokemonModel.insertMany(pokemons);

    return resul;
  }
  
}
