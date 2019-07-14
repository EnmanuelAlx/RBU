import { Request, Response } from 'express';
import { getManager, InsertResult, Repository } from 'typeorm';
import { EstadoSala } from '../entities/estado_sala';
import { TipoOfertaAcademica } from '../entities/tipo_oferta_academica';
import { TipoSala, TipoSalaRelations } from '../entities/tipo_sala';
import { Method, Route } from '../routes';

export class TipoSalasController {
  public repository: Repository<TipoSala>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(TipoSala);
    this.setRoutes();
  }
  public async getAll(req: Request, res: Response) {
    const TipoSalaRepository = getManager().getRepository(TipoSala);
    const tipoSala = await TipoSalaRepository.find({
      relations: [TipoSalaRelations.salas]
    });

    res.send(tipoSala);
  }
  public async getById(req: Request, res: Response) {
    const TipoSalaRepository = getManager().getRepository(TipoSala);
    const tipoSala = await TipoSalaRepository.findOne(req.params.id, {
      relations: [TipoSalaRelations.salas]
    });

    if (!tipoSala) {
      res.status(404);
      res.end();
      return;
    }
    res.send(tipoSala);
  }

  public async add(req: Request, res: Response) {
    const TipoSalaRepository = getManager().getRepository(TipoSala);
    const tipoSala: TipoSala = req.body;
    TipoSalaRepository.insert(tipoSala).then((tipoSala$: InsertResult) => {
      res.send({
        id: tipoSala$.raw.insertId
      });
    });

    if (!tipoSala) {
      res.status(404);
      res.end();
      return;
    }
  }

  public async update(req: Request, res: Response) {
    const { descripcion } = req.body;
    const { id } = req.params;
    const TipoSalaRepository = getManager().getRepository(TipoSala);
    const tipoSala = await TipoSalaRepository.findOne(id);
    if (!tipoSala) {
      res.status(404);
      res.end();
      return;
    }
    if (descripcion) {
      tipoSala.descripcion = descripcion;
    }
    TipoSalaRepository.update({ id }, tipoSala);
    res.send(tipoSala);
  }

  public async deleteOne(req: Request, res: Response): Promise<EstadoSala> {
    const { id } = req.params;
    const TipoSalaRepository = getManager().getRepository(TipoSala);
    const estadoSala = await TipoSalaRepository.findOne(id);
    if (!estadoSala) {
      res.status(404);
      res.end();
      return;
    }
    TipoSalaRepository.delete({ id: estadoSala.id });
    res.send(estadoSala);
  }

  private setRoutes() {
    this.routes = [{
      action: this.getAll,
      method: Method.get,
      path: '/api/salas'
    },
    {
      action: this.add,
      method: Method.post,
      path: '/api/sala'
    },
    {
      action: this.getById,
      method: Method.get,
      path: '/api/sala/:id'
    },
    {
      action: this.update,
      method: Method.update,
      path: '/api/sala/:id'
    },
    {
      action: this.deleteOne,
      method: Method.delete,
      path: '/api/sala/:id'
    }];
  }
}
