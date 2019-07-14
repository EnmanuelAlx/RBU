import { Request, Response } from 'express';
import { getManager, Repository } from 'typeorm';
import { OfertaAcademica } from '../entities/oferta_academica';
import { Route, Method } from '../routes';

export class OfertaAcademicaController {
  public repository: Repository<OfertaAcademica>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(OfertaAcademica);
    this.setRoutes();
  }

  public async  getAll(req: Request, res: Response) {
    this.repository = getManager().getRepository(OfertaAcademica);

    const ofertasAcademicas = await this.repository.find({
      relations: ['idTipo']
    });

    res.send(ofertasAcademicas);
  }

  public async  getById(req: Request, res: Response) {
    this.repository = getManager().getRepository(OfertaAcademica);

    const ofertaAcademica = await this.repository.findOne(req.params.id);

    if (!ofertaAcademica) {
      res.status(404);
      res.end();
      return;
    }
    res.send(ofertaAcademica);
  }

  public async  add(req: Request, res: Response) {
    this.repository = getManager().getRepository(OfertaAcademica);

    const ofertaAcademica = req.body;
    console.log(ofertaAcademica.idTipo);
    this.repository.insert(ofertaAcademica).then((ofertaAcademica$) => {

      res.send({
        descripcion: ofertaAcademica.descripcion,
        id: ofertaAcademica$.raw.insertId,
        idTipo: ofertaAcademica.idTipo
      });
    });

    if (!ofertaAcademica) {
      res.status(404);
      res.end();
      return;
    }

  }

  public async  update(req: Request, res: Response) {
    this.repository = getManager().getRepository(OfertaAcademica);

    const { descripcion, idTipo } = req.body;
    const { id } = req.params;
    const ofertaAcademica = await this.repository.findOne(id);
    if (!ofertaAcademica) {
      res.status(404);
      res.end();
      return;
    }
    if (descripcion) {
      ofertaAcademica.descripcion = descripcion;
      ofertaAcademica.idTipo = idTipo;
    }
    this.repository.update({ id }, ofertaAcademica);
    res.send(ofertaAcademica);
  }

  public async  deleteOne(req: Request, res: Response) {
    this.repository = getManager().getRepository(OfertaAcademica);

    const { id } = req.params;
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
      path: '/api/ofertasAcademicas'
    },
    {
      action: this.add,
      method: Method.post,
      path: '/api/ofertasAcademica'
    },
    {
      action: this.getById,
      method: Method.get,
      path: '/api/ofertasAcademica/:id'
    },
    {
      action: this.update,
      method: Method.update,
      path: '/api/ofertasAcademica/:id'
    },
    {
      action: this.deleteOne,
      method: Method.delete,
      path: '/api/ofertasAcademica/:id'
    }];
  }
}