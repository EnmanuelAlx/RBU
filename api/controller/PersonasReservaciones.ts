import { Request, Response } from 'express';
import { getManager, InsertResult, Repository } from 'typeorm';
import {
  PersonasReservacion,
  PersonasReservacionRelations
} from '../entities/personas_reservacion';
import { Method, Route } from '../routes';

export class PersonasReservacionController {
  public repository: Repository<PersonasReservacion>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(PersonasReservacion);
    this.setRoutes();
  }
  public async getAll(req: Request, res: Response) {
    this.repository = getManager().getRepository(PersonasReservacion);
    const personasReservacion = await this.repository.find({
      relations: [
        PersonasReservacionRelations.idPersona,
        PersonasReservacionRelations.idReservacion,
        PersonasReservacionRelations.sancions
      ]
    });
    res.send(personasReservacion);
  }
  public async getById(req: Request, res: Response) {
    this.repository = getManager().getRepository(PersonasReservacion);
    const personasReservacion = await this.repository.findOne(
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
  }
  public async add(req: Request, res: Response) {
    this.repository = getManager().getRepository(PersonasReservacion);
    const personasReservacion: PersonasReservacion = req.body;
    this.repository.insert(personasReservacion).then(
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
  }

  public async update(req: Request, res: Response) {
    this.repository = getManager().getRepository(PersonasReservacion);
    const { } = req.body;

    const { id } = req.params;
    const personasReservacion: PersonasReservacion = await this.repository.findOne(
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
    this.repository.update({ id }, personasReservacion);
    res.send(personasReservacion);
  }

  public async deleteOne(req: Request, res: Response) {
    this.repository = getManager().getRepository(PersonasReservacion);
    const { id } = req.params;
    const personasReservacion = await this.repository.findOne(id);
    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }
    this.repository.delete({ id: personasReservacion.id });
    res.send(personasReservacion);
  }

  private setRoutes() {
    this.routes = [{
      action: this.getAll,
      method: Method.get,
      path: '/api/personasReservaciones'
    },
    {
      action: this.add,
      method: Method.post,
      path: '/api/personasReservacion'
    },
    {
      action: this.getById,
      method: Method.get,
      path: '/api/personasReservacion/:id'
    },
    {
      action: this.update,
      method: Method.update,
      path: '/api/personasReservacion/:id'
    },
    {
      action: this.deleteOne,
      method: Method.delete,
      path: '/api/personasReservacion/:id'
    }];
  }
}
