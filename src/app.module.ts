
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    // ! Importar el módulo de configuración de variables de entorno
    ConfigModule.forRoot(),
    // Importanción para servir archivos estaticos de la carpeta public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    
    // Conexión a la base de datos
    MongooseModule.forRoot( process.env.MONGODB ?? "" ),
    
    PokemonModule,

    CommonModule,

    SeedModule

  ],
})
export class AppModule {

  constructor(){
    console.log(process.env);
  }

}
