
import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { PraticaService } from './pratica.service';

@Controller()
export class PraticaController {
  constructor(private service:PraticaService){}

  @Post('pratica')
  create(@Body() body){ return this.service.create(body); }

  @Get('historico')
  find(@Query() q){ return this.service.findAll(q); }

  @Get('estatisticas')
  stats(){ return this.service.stats(); }
}
