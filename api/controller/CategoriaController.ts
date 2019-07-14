import { Request, Response } from 'express';
import { getManager, Repository } from 'typeorm';
import { Categorias } from '../entities/categorias';
import { Method, Route } from '../routes';

export class CategoriaController {

  public repository: Repository<Categorias>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(Categorias);
    this.setRoutes();
  }

  public async  getAll(req: Request, res: Response) {
    this.repository = getManager().getRepository(Categorias);
    const tipoofertasAcademicas = await this.repository.find();
    res.send(tipoofertasAcademicas);
  }

  public async  getById(req: Request, res: Response) {
    this.repository = getManager().getRepository(Categorias);

    const categoria = await this.repository.findOne(req.params.id);
    // this.repository.create()
    if (!categoria) {
      res.status(404);
      res.end();
      return;
    }
    res.send(categoria);
  }

  public async  add(req: Request, res: Response) {
    this.repository = getManager().getRepository(Categorias);

    const categoria = req.body;
    this.repository.insert(categoria).then((categoria$) => {
      res.send({
        descripcion: categoria.descripcion,
        id: categoria$.raw.insertId,
      });
    });

    if (!categoria) {
      res.status(404);
      res.end();
      return;
    }

  }

  public async  update(req: Request, res: Response) {
    this.repository = getManager().getRepository(Categorias);

    const { descripcion } = req.body;
    const { id } = req.params;

    const categoria = await this.repository.findOne(id);
    if (!categoria) {
      res.status(404);
      res.end();
      return;
    }
    if (descripcion) {
      categoria.descripcion = descripcion;
    }
    this.repository.update({ id }, categoria);
    res.send(categoria);
  }

  public async  deleteOne(req: Request, res: Response) {
    this.repository = getManager().getRepository(Categorias);

    const { id } = req.params;

    const categoria = await this.repository.findOne(id);

    if (!categoria) {
      res.status(404);
      res.end();
      return;
    }
    this.repository.delete({ id: categoria.id });
    res.send(categoria);
  }

  private setRoutes() {
    this.routes = [{
      action: this.getAll,
      method: Method.get,
      path: '/api/categorias'
    },
    {
      action: this.add,
      method: Method.post,
      path: '/api/categoria'
    },
    {
      action: this.getById,
      method: Method.get,
      path: '/api/categoria/:id'
    },
    {
      action: this.update,
      method: Method.update,
      path: '/api/categoria/:id'
    },
    {
      action: this.deleteOne,
      method: Method.delete,
      path: '/api/categoria/:id'
    }];
  }

}
