import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Sancion } from '../entities/sancion';

export default {
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
