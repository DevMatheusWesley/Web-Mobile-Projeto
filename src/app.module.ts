
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PraticaModule } from './pratica/pratica.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ods_praticas'),
    PraticaModule,
  ],
})
export class AppModule {}
