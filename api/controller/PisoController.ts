import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Piso } from '../entities/piso';

export default {
  async getAll(req: Request, res: Response) {
    const pisoRepository = getManager().getRepository(Piso);
    const pisos = await pisoRepository.find();

    res.send(pisos);
  },
  async getById(req: Request, res: Response) {
    const pisoRepository = getManager().getRepository(Piso);
    const piso = await pisoRepository.findOne(req.params.id);

    if (!piso) {
      res.status(404);
      res.end();
      return;
    }
    res.send(piso);
  },
  async add(req: Request, res: Response) {
    const pisoRepository = getManager().getRepository(Piso);
    const piso = req.body;
    pisoRepository.insert(piso);

    if (!piso) {
      res.status(404);
      res.end();
      return;
    }
    res.send(piso);
  },
  async update(req: Request, res: Response) {
    const { descripcion, id } = req.body;
    const pisoRepository = getManager().getRepository(Piso);
    const piso = await pisoRepository.findOne(id);
    if (!piso) {
      res.status(404);
      res.end();
      return;
    }
    if (descripcion) {
      piso.descripcion = descripcion;
    }
    pisoRepository.update({ id }, piso);
    res.send(piso);
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const pisoRepository = getManager().getRepository(Piso);
    const piso = await pisoRepository.findOne(id);
    if (!piso) {
      res.status(404);
      res.end();
      return;
    }
    pisoRepository.delete({ id: piso.id });
    res.send(piso);
  }
};
