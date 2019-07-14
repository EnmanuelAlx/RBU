import { Request, Response } from 'express';
import { getManager, Repository } from 'typeorm';
import { Persona } from '../entities/persona';
import { Route, Method } from '../routes';


export class PersonaController {
  public repository: Repository<Persona>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(Persona);
    this.setRoutes();
  }
  public async getAll(req: Request, res: Response) {
    this.repository = getManager().getRepository(Persona);
    const personas = await this.repository.find({
      relations: ['idOfertaAcademica', 'idCategoria']
    });

    res.send(personas);
  }

  public async getById(req: Request, res: Response) {
    this.repository = getManager().getRepository(Persona);
    const persona = await this.repository.findOne(req.params.id);

    if (!persona) {
      res.status(404);
      res.end();
      return;
    }
    res.send(persona);
  }
  public async getByCedula(req: Request, res: Response) {
    this.repository = getManager().getRepository(Persona);
    const persona = await this.repository.findOne(req.params.cedula);

    if (!persona) {
      res.status(404);
      res.end();
      return;
    }
    res.send(persona);
  }
  public async add(req: Request, res: Response) {
    this.repository = getManager().getRepository(Persona);
    const persona = req.body;
    this.repository.insert(persona).then((persona$) => {

      res.send({
        persona
      });
    });

    if (!persona) {
      res.status(404);
      res.end();
      return;
    }

  }
  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nombres } = req.body;
    const { apellidos } = req.body;
    const { idOfertaAcademica } = req.body;
    const { idCategoria } = req.body;
    this.repository = getManager().getRepository(Persona);
    const persona = await this.repository.findOne(id);
    if (!persona) {
      res.status(404);
      res.end();
      return;
    }
    persona.nombres = nombres;
    persona.apellidos = apellidos;
    persona.idOfertaAcademica = idOfertaAcademica;
    persona.idCategoria = idCategoria;
    this.repository.update({ id }, persona);
    res.send(persona);
  }

  public async deleteOne(req: Request, res: Response) {
    const { id } = req.params;
    this.repository = getManager().getRepository(Persona);
    const persona = await this.repository.findOne(id);
    if (!persona) {
      res.status(404);
      res.end();
      return;
    }
    this.repository.delete({ id: persona.id });
    res.send(persona);
  }


  private setRoutes() {
    this.routes = [{
      action: this.getAll,
      method: Method.get,
      path: '/api/personas'
    },
    {
      action: this.add,
      method: Method.post,
      path: '/api/persona'
    },
    {
      action: this.getById,
      method: Method.get,
      path: '/api/persona/:id'
    },
    {
      action: this.update,
      method: Method.update,
      path: '/api/persona/:id'
    },
    {
      action: this.deleteOne,
      method: Method.delete,
      path: '/api/persona/:id'
    }];
  }
}