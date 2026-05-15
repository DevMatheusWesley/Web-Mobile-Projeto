
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pratica, PraticaSchema } from './pratica.schema';
import { PraticaService } from './pratica.service';
import { PraticaController } from './pratica.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:Pratica.name,schema:PraticaSchema}])],
  providers:[PraticaService],
  controllers:[PraticaController]
})
export class PraticaModule {}
