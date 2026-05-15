
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pratica } from './pratica.schema';

@Injectable()
export class PraticaService {
  constructor(@InjectModel(Pratica.name) private model: Model<Pratica>) {}

  create(data:any){ return this.model.create(data); }
  findAll(query:any){ return this.model.find(query); }

  async stats(){
    const total = await this.model.countDocuments();
    const porTipo = await this.model.aggregate([
      {$group:{_id:"$tipo",count:{$sum:1}}},
      {$sort:{count:-1}}
    ]);
    const porUsuario = await this.model.aggregate([
      {$group:{_id:"$nomeUsuario",count:{$sum:1}}},
      {$sort:{count:-1}}
    ]);
    return {
      total,
      tipoMaisComum: porTipo[0]?._id,
      usuarioMaisAtivo: porUsuario[0]?._id,
      totalPorTipo: porTipo
    }
  }
}
