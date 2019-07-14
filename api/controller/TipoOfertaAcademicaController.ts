import { Request, Response } from 'express';
import { getManager, Repository } from 'typeorm';
import { Sancion } from '../entities/sancion';
import { TipoOfertaAcademica } from '../entities/tipo_oferta_academica';
import { Method, Route } from '../routes';

export class TipoOfertaAcademicaController {
  public repository: Repository<TipoOfertaAcademica>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(TipoOfertaAcademica);
    this.setRoutes();
  }
  public async getAll(req: Request, res: Response) {
    this.repository = getManager().getRepository(TipoOfertaAcademica);

    const tipoofertasAcademicas = await this.repository.find();

    res.send(tipoofertasAcademicas);
  }
  public async getById(req: Request, res: Response) {
    this.repository = getManager().getRepository(TipoOfertaAcademica);

    const ofertaAcademica = await this.repository.findOne(req.params.id);

    if (!ofertaAcademica) {
      res.status(404);
      res.end();
      return;
    }
    res.send(ofertaAcademica);
  }
  public async add(req: Request, res: Response) {
    this.repository = getManager().getRepository(TipoOfertaAcademica);

    const ofertaAcademica = req.body;
    this.repository.insert(ofertaAcademica).then((ofertaAcademica$) => {

      res.send({
        descripcion: ofertaAcademica.descripcion,
        id: ofertaAcademica$.raw.insertId,
      });
    });

    if (!ofertaAcademica) {
      res.status(404);
      res.end();
      return;
    }

  }
  public async update(req: Request, res: Response) {
    const { descripcion } = req.body;
    const { id } = req.params;
    this.repository = getManager().getRepository(TipoOfertaAcademica);

    const ofertaAcademica = await this.repository.findOne(id);
    if (!ofertaAcademica) {
      res.status(404);
      res.end();
      return;
    }
    if (descripcion) {
      ofertaAcademica.descripcion = descripcion;
    }
    this.repository.update({ id }, ofertaAcademica);
    res.send(ofertaAcademica);
  }

  public async deleteOne(req: Request, res: Response) {
    const { id } = req.params;
    this.repository = getManager().getRepository(TipoOfertaAcademica);

    const ofertaAcademica = await this.repository.findOne(id);

    if (!ofertaAcademica) {
      res.status(404);
      res.end();
      return;
    }
    this.repository.delete({ id: ofertaAcademica.id });
    res.send(ofertaAcademica);
  }

  private setRoutes() {
    this.routes = [{
      action: this.getAll,
      method: Method.get,
      path: '/api/tipoOfertaAcademica'
    },
    {
      action: this.add,
      method: Method.post,
      path: '/api/tipoOfertaAcademica'
    },
    {
      action: this.getById,
      method: Method.get,
      path: '/api/tipoOfertaAcademica/:id'
    },
    {
      action: this.update,
      method: Method.update,
      path: '/api/tipoOfertaAcademica/:id'
    },
    {
      action: this.deleteOne,
      method: Method.delete,
      path: '/api/tipoOfertaAcademica/:id'
    }];
  }
}
