import { Request, Response } from 'express';
import { getManager, InsertResult, Repository } from 'typeorm';
import { EstadoSala, EstadoSalaRelations } from '../entities/estado_sala';
import { Route, Method } from '../routes';


export class EstadoSalaController {
  public repository: Repository<EstadoSala>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(EstadoSala);
    this.setRoutes();
  }

  public async  getAll(req: Request, res: Response) {
    this.repository = getManager().getRepository(EstadoSala);

    const estadoSala = await this.repository.find({
      relations: [EstadoSalaRelations.salas]
    });

    res.send(estadoSala);
  }

  public async  getById(req: Request, res: Response) {
    this.repository = getManager().getRepository(EstadoSala);

    const estadoSala = await this.repository.findOne(req.params.id, {
      relations: [EstadoSalaRelations.salas]
    });

    if (!estadoSala) {
      res.status(404);
      res.end();
      return;
    }
    res.send(estadoSala);
  }

  public async  add(req: Request, res: Response) {
    this.repository = getManager().getRepository(EstadoSala);

    const estadoSala: EstadoSala = req.body;
    this.repository.insert(estadoSala).then(
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
  }

  public async  update(req: Request, res: Response) {
    this.repository = getManager().getRepository(EstadoSala);

    const { descripcion } = req.body;
    const { id } = req.params;
    const estadoSala = await this.repository.findOne(id);
    if (!estadoSala) {
      res.status(404);
      res.end();
      return;
    }
    if (descripcion) {
      estadoSala.descripcion = descripcion;
    }
    this.repository.update({ id }, estadoSala);
    res.send(estadoSala);
  }

  public async  deleteOne(req: Request, res: Response) {
    this.repository = getManager().getRepository(EstadoSala);

    const { id } = req.params;
    const estadoSala = await this.repository.findOne(id);
    if (!estadoSala) {
      res.status(404);
      res.end();
      return;
    }
    this.repository.delete({ id: estadoSala.id });
    res.send(estadoSala);
  }

  private setRoutes() {
    this.routes = [{
      action: this.getAll,
      method: Method.get,
      path: '/api/estadoSala'
    },
    {
      action: this.add,
      method: Method.post,
      path: '/api/estadoSala'
    },
    {
      action: this.getById,
      method: Method.get,
      path: '/api/estadoSala/:id'
    },
    {
      action: this.update,
      method: Method.update,
      path: '/api/estadoSala/:id'
    },
    {
      action: this.deleteOne,
      method: Method.delete,
      path: '/api/estadoSala/:id'
    }];
  }
}

