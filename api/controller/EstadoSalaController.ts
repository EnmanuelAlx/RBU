import { Request, Response } from 'express';
import { getManager, InsertResult } from 'typeorm';
import { EstadoSala, EstadoSalaRelations } from '../entities/estado_sala';

export default {
  async getAll(req: Request, res: Response) {
    const EstadoSalaRepository = getManager().getRepository(EstadoSala);
    const estadoSala = await EstadoSalaRepository.find({
      relations: [EstadoSalaRelations.salas]
    });

    res.send(estadoSala);
  },
  async getById(req: Request, res: Response) {
    const EstadoSalaRepository = getManager().getRepository(EstadoSala);
    const estadoSala = await EstadoSalaRepository.findOne(req.params.id, {
      relations: [EstadoSalaRelations.salas]
    });

    if (!estadoSala) {
      res.status(404);
      res.end();
      return;
    }
    res.send(estadoSala);
  },

  async add(req: Request, res: Response) {
    const EstadoSalaRepository = getManager().getRepository(EstadoSala);
    const estadoSala: EstadoSala = req.body;
    EstadoSalaRepository.insert(estadoSala).then(
      (estadoSala$: InsertResult) => {
        res.send({
          id: estadoSala$.raw.insertId
        });
      }
    );

    if (!estadoSala) {
      res.status(404);
      res.end();
      return;
    }
  },

  async update(req: Request, res: Response) {
    const { descripcion } = req.body;
    const { id } = req.params;
    const EstadoSalaRepository = getManager().getRepository(EstadoSala);
    const estadoSala = await EstadoSalaRepository.findOne(id);
    if (!estadoSala) {
      res.status(404);
      res.end();
      return;
    }
    if (descripcion) {
      estadoSala.descripcion = descripcion;
    }
    EstadoSalaRepository.update({ id }, estadoSala);
    res.send(estadoSala);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const EstadoSalaRepository = getManager().getRepository(EstadoSala);
    const estadoSala = await EstadoSalaRepository.findOne(id);
    if (!estadoSala) {
      res.status(404);
      res.end();
      return;
    }
    EstadoSalaRepository.delete({ id: estadoSala.id });
    res.send(estadoSala);
  }
};
