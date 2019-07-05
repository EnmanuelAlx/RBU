import { Request, Response } from 'express';
import { getManager, InsertResult } from 'typeorm';
import { TipoSala, TipoSalaRelations } from '../entities/tipo_sala';

export default {
  async getAll(req: Request, res: Response) {
    const TipoSalaRepository = getManager().getRepository(TipoSala);
    const tipoSala = await TipoSalaRepository.find({
      relations: [TipoSalaRelations.salas]
    });

    res.send(tipoSala);
  },
  async getById(req: Request, res: Response) {
    const TipoSalaRepository = getManager().getRepository(TipoSala);
    const tipoSala = await TipoSalaRepository.findOne(req.params.id, {
      relations: [TipoSalaRelations.salas]
    });

    if (!tipoSala) {
      res.status(404);
      res.end();
      return;
    }
    res.send(tipoSala);
  },

  async add(req: Request, res: Response) {
    const TipoSalaRepository = getManager().getRepository(TipoSala);
    const tipoSala: TipoSala = req.body;
    TipoSalaRepository.insert(tipoSala).then((tipoSala$: InsertResult) => {
      res.send({
        id: tipoSala$.raw.insertId
      });
    });

    if (!tipoSala) {
      res.status(404);
      res.end();
      return;
    }
  },

  async update(req: Request, res: Response) {
    const { descripcion } = req.body;
    const { id } = req.params;
    const TipoSalaRepository = getManager().getRepository(TipoSala);
    const estadoSala = await TipoSalaRepository.findOne(id);
    if (!estadoSala) {
      res.status(404);
      res.end();
      return;
    }
    if (descripcion) {
      estadoSala.descripcion = descripcion;
    }
    TipoSalaRepository.update({ id }, estadoSala);
    res.send(estadoSala);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const TipoSalaRepository = getManager().getRepository(TipoSala);
    const estadoSala = await TipoSalaRepository.findOne(id);
    if (!estadoSala) {
      res.status(404);
      res.end();
      return;
    }
    TipoSalaRepository.delete({ id: estadoSala.id });
    res.send(estadoSala);
  }
};
