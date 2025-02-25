
import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Importanción para servir archivos estaticos de la carpeta public
    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),

    // Conexión a la base de datos
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-pokemon'),

    PokemonModule 
  ],
})
export class AppModule {}
