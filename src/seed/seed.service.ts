import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {


  private readonly axios: AxiosInstance = axios

  constructor(
      @InjectModel( Pokemon.name )
      private readonly pokemonModel: Model<Pokemon>
    ){
  
    }

  async executeSeed(){

    await this.pokemonModel.deleteMany({});

    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')


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
