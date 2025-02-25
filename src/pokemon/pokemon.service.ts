import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  // ** Aquí inyectamos el modelo para hacer insersiones en la base de datos
  // ** Colocamos el decorador InjectModel ya que esto cómo tal no es un servicio o providers
  // ** Y de esa manera ya podemos hacer la inyeccion de dependencias
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {

      const pokemon = await this.pokemonModel.create( createPokemonDto )
      return pokemon;

    } catch (error) {
      // ! En lugar de consultar la base y ver si existe
      // ! directamente vemos el código del error y si es 11,000 significa que el dato ya existe
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon already exist in the DB ${ JSON.stringify(error.keyValue) }`)
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }

    const pokemon = await this.pokemonModel.create( createPokemonDto )

    return pokemon;
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
