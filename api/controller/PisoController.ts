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
  }
};
