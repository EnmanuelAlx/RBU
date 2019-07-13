import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Persona } from '../entities/persona';

export async function getAll(req: Request, res: Response) {
  const personaRepository = getManager().getRepository(Persona);
  const personas = await personaRepository.find({
    relations: ['idOfertaAcademica', 'idCategoria']
  });

  res.send(personas);
}

export async function getById(req: Request, res: Response) {
  const personaRepository = getManager().getRepository(Persona);
  const persona = await personaRepository.findOne(req.params.id);

  if (!persona) {
    res.status(404);
    res.end();
    return;
  }
  res.send(persona);
}
export async function getByCedula(req: Request, res: Response) {
  const personaRepository = getManager().getRepository(Persona);
  const persona = await personaRepository.findOne(req.params.cedula);

  if (!persona) {
    res.status(404);
    res.end();
    return;
  }
  res.send(persona);
}
export async function add(req: Request, res: Response) {
  const personaRepository = getManager().getRepository(Persona);
  const persona = req.body;
  personaRepository.insert(persona).then((persona$) => {

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
export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const { nombres } = req.body;
  const { apellidos } = req.body;
  const { idOfertaAcademica } = req.body;
  const { idCategoria } = req.body;
  const personaRepository = getManager().getRepository(Persona);
  const persona = await personaRepository.findOne(id);
  if (!persona) {
    res.status(404);
    res.end();
    return;
  }
  persona.nombres = nombres;
  persona.apellidos = apellidos;
  persona.idOfertaAcademica = idOfertaAcademica;
  persona.idCategoria = idCategoria;
  personaRepository.update({ id }, persona);
  res.send(persona);
}

export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;
  const personaRepository = getManager().getRepository(Persona);
  const persona = await personaRepository.findOne(id);
  if (!persona) {
    res.status(404);
    res.end();
    return;
  }
  personaRepository.delete({ id: persona.id });
  res.send(persona);
}

