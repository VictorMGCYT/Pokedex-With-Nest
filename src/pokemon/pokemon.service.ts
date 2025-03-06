import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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
      
      this.handleExceptions(error);

    }

  }

  async findAll( paginationDto: PaginationDto ) {
    return await this.pokemonModel.find()
      .limit(paginationDto.limit ?? 10)
      .skip(paginationDto.offset ?? 0)
      .sort({ no: 1})
      .select('-__v') //Para quitar propiedades que no queremos mostrar

  }

  async findOne(term: string) {

    // ! Definimos la variable pokemon del tipo Pokemon or null, y por defecto iniciamos en null
    let pokemon: Pokemon | null = null;

    // Buscamos primero por el número del pokemon
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({no: term})
    }
    // Si no está lo primero validamos si es un MongoID y lo buscamos
    else if ( isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findById(term)
    }
    // Si nada funcionó pokemon seguira siendo null, así que ya solo buscamos si lo encuentra por nombre
    else if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()})
    }

    if(!pokemon){
      throw new NotFoundException(`Pokemon with id, name or no "${term} was not found"`)
    }
  
    
    return pokemon;
  } 

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon: Pokemon = await this.findOne(term)

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name?.toLocaleLowerCase();
    }
    
    try {

      await pokemon.updateOne(updatePokemonDto, {new: true})
      return {...pokemon.toJSON(), ...updatePokemonDto};

    } catch (error) {
      
      this.handleExceptions(error);
     
    }

  }

  async remove(id: string) {

    // const pokemon: Pokemon = await this.findOne(id)
    // await pokemon.deleteOne()
    // ! const resul = await this.pokemonModel.findByIdAndDelete(id);

    const resul = await this.pokemonModel.deleteOne({ _id: id })

    if(resul.deletedCount === 0){
      throw new BadRequestException(`Pokemon whit id "${id} was not found"`)
    }

    return resul;
  }

  private handleExceptions( error: any ){
    // ! En lugar de consultar la base y ver si existe
      // ! directamente vemos el código del error y si es 11,000 significa que el dato ya existe
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exist in the DB ${ JSON.stringify(error.keyValue) }`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
