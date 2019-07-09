import { Request, Response } from "express";
import { getManager, InsertResult } from "typeorm";
import { Sala, SalaRelations } from "../entities/sala";

export default {
  async getAll(req: Request, res: Response) {
    const SalaRepository = getManager().getRepository(Sala);
    const salas = await SalaRepository.find({
      relations: [
        SalaRelations.idEstado,
        SalaRelations.idPiso,
        SalaRelations.reservacions
      ]
    });
    res.send(salas);
  },
  async getById(req: Request, res: Response) {
    const SalaRepository = getManager().getRepository(Sala);
    const sala = await SalaRepository.findOne(req.params.id, {
      relations: [
        SalaRelations.idEstado,
        SalaRelations.idPiso,
        SalaRelations.reservacions
      ]
    });

    if (!sala) {
      res.status(404);
      res.end();
      return;
    }
    res.send(sala);
  },
  async add(req: Request, res: Response) {
    const SalaRepository = getManager().getRepository(Sala);
    const sala = req.body;
    SalaRepository.insert(sala).then((sala$: InsertResult) => {
      res.send({
        id: sala$.raw.insertId
      });
    });

    if (!Sala) {
      res.status(404);
      res.end();
      return;
    }
  },
  async update(req: Request, res: Response) {
    const { idEstado, idPiso } = req.body;
    const { id } = req.params;
    const SalaRepository = getManager().getRepository(Sala);
    const sala = await SalaRepository.findOne(id);
    if (!sala) {
      res.status(404);
      res.end();
      return;
    }
    if (idEstado) {
      sala.idEstado = idEstado;
    }
    if (idPiso) {
      sala.idPiso = idPiso;
    }
    SalaRepository.update({ id }, sala);
    res.send(sala);
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const SalaRepository = getManager().getRepository(Sala);
    const sala = await SalaRepository.findOne(id);
    if (!sala) {
      res.status(404);
      res.end();
      return;
    }
    SalaRepository.delete({ id: sala.id });
    res.send(sala);
  }
};
