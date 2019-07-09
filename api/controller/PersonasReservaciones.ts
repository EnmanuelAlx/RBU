import { Request, Response } from "express";
import { getManager, InsertResult } from "typeorm";
import {
  PersonasReservacion,
  PersonasReservacionRelations
} from "../entities/personas_reservacion";

export default {
  async getAll(req: Request, res: Response) {
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const personasReservacion = await PersonasReservacionRepository.find({
      relations: [
        PersonasReservacionRelations.idPersona,
        PersonasReservacionRelations.idReservacion,
        PersonasReservacionRelations.sancions
      ]
    });
    res.send(personasReservacion);
  },
  async getById(req: Request, res: Response) {
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const personasReservacion = await PersonasReservacionRepository.findOne(
      req.params.id,
      {
        relations: [
          PersonasReservacionRelations.idPersona,
          PersonasReservacionRelations.idReservacion,
          PersonasReservacionRelations.sancions
        ]
      }
    );

    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }
    res.send(personasReservacion);
  },
  async add(req: Request, res: Response) {
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const personasReservacion: PersonasReservacion = req.body;
    PersonasReservacionRepository.insert(personasReservacion).then(
      (personasReservacion$: InsertResult) => {
        res.send({
          id: personasReservacion$.raw.insertId
        });
      }
    );

    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }
  },

  async update(req: Request, res: Response) {
    const {} = req.body;

    const { id } = req.params;
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const personasReservacion: PersonasReservacion = await PersonasReservacionRepository.findOne(
      id
    );
    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }

    for (const key in req.body) {
      if (personasReservacion.hasOwnProperty(key)) {
        personasReservacion[key] = req.body[key];
      }
    }
    PersonasReservacionRepository.update({ id }, personasReservacion);
    res.send(personasReservacion);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const personasReservacion = await PersonasReservacionRepository.findOne(id);
    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }
    PersonasReservacionRepository.delete({ id: personasReservacion.id });
    res.send(personasReservacion);
  }
};
