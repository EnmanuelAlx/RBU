import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Sancion } from '../entities/sancion';

export default {
  async getAll(req: Request, res: Response) {
    const SancionRepository = getManager().getRepository(Sancion);
    const sancion = await SancionRepository.find({
      relations: ['idPersonaReservacion']
    });
    res.send(sancion);
  },
async add(req: Request, res: Response) {
    const sancionRepository = getManager().getRepository(Sancion);
    const sancion = req.body.sancion;
    console.log(sancion);
    sancionRepository.insert(sancion).then((sancion$) => {
      res.send({
        sancion$
      });
    });

    if (!sancion) {
      res.status(404);
      res.end();
      return;
    }

  }
};
