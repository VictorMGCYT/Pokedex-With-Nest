
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// Las entidades hacen referencia a una tabla en la base de datos con sus tipos
// Y cada instancia de esta entidad generará un nuevo registro en la Base de datos
@Schema()
export class Pokemon extends Document {

    // No hay que especificar ID ya que Mongo genera un MongoID
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no: number;

}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
