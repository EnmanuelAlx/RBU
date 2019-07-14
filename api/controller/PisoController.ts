import { Request, Response } from 'express';
import { getManager, Repository } from 'typeorm';
import { Piso } from '../entities/piso';
import { Method, Route } from '../routes';

export class PisoController {
  public repository: Repository<Piso>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(Piso);
    this.setRoutes();
  }
  public async getAll(req: Request, res: Response) {
    this.repository = getManager().getRepository(Piso);

    const pisos = await this.repository.find();

    res.send(pisos);
  }
  public async getById(req: Request, res: Response) {
    this.repository = getManager().getRepository(Piso);

    const piso = await this.repository.findOne(req.params.id);

    if (!piso) {
      res.status(404);
      res.end();
      return;
    }
    res.send(piso);
  }
  public async add(req: Request, res: Response) {
    this.repository = getManager().getRepository(Piso);

    const piso = req.body;
    this.repository.insert(piso).then((piso$) => {

      res.send({
        descripcion: piso.descripcion,
        id: piso$.raw.insertId,
      });
    });

    if (!piso) {
      res.status(404);
      res.end();
      return;
    }

  }
  public async update(req: Request, res: Response) {
    this.repository = getManager().getRepository(Piso);

    const { descripcion } = req.body;
    const { id } = req.params;
    const piso = await this.repository.findOne(id);
    if (!piso) {
      res.status(404);
      res.end();
      return;
    }
    if (descripcion) {
      piso.descripcion = descripcion;
    }
    this.repository.update({ id }, piso);
    res.send(piso);
  }
  public async deleteOne(req: Request, res: Response) {
    this.repository = getManager().getRepository(Piso);

    const { id } = req.params;
    const piso = await this.repository.findOne(id);
    if (!piso) {
      res.status(404);
      res.end();
      return;
    }
    this.repository.delete({ id: piso.id });
    res.send(piso);
  }

  private setRoutes() {
    this.routes = [{
      action: this.getAll,
      method: Method.get,
      path: '/api/pisos'
    },
    {
      action: this.add,
      method: Method.post,
      path: '/api/piso'
    },
    {
      action: this.getById,
      method: Method.get,
      path: '/api/piso/:id'
    },
    {
      action: this.update,
      method: Method.update,
      path: '/api/piso/:id'
    },
    {
      action: this.deleteOne,
      method: Method.delete,
      path: '/api/piso/:id'
    }];
  }
}
