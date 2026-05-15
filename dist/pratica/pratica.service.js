"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PraticaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pratica_schema_1 = require("./pratica.schema");
let PraticaService = class PraticaService {
    constructor(model) {
        this.model = model;
    }
    create(data) { return this.model.create(data); }
    findAll(query) { return this.model.find(query); }
    async stats() {
        const total = await this.model.countDocuments();
        const porTipo = await this.model.aggregate([
            { $group: { _id: "$tipo", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        const porUsuario = await this.model.aggregate([
            { $group: { _id: "$nomeUsuario", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        return {
            total,
            tipoMaisComum: porTipo[0]?._id,
            usuarioMaisAtivo: porUsuario[0]?._id,
            totalPorTipo: porTipo
        };
    }
};
exports.PraticaService = PraticaService;
exports.PraticaService = PraticaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pratica_schema_1.Pratica.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PraticaService);
