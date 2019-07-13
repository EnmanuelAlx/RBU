import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Piso } from '../entities/piso';

export async function getAll(req: Request, res: Response) {
  const pisoRepository = getManager().getRepository(Piso);
  const pisos = await pisoRepository.find();

  res.send(pisos);
}
export async function getById(req: Request, res: Response) {
  const pisoRepository = getManager().getRepository(Piso);
  const piso = await pisoRepository.findOne(req.params.id);

  if (!piso) {
    res.status(404);
    res.end();
    return;
  }
  res.send(piso);
}
export async function add(req: Request, res: Response) {
  const pisoRepository = getManager().getRepository(Piso);
  const piso = req.body;
  pisoRepository.insert(piso).then((piso$) => {

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
export async function update(req: Request, res: Response) {
  const { descripcion } = req.body;
  const { id } = req.params;
  const pisoRepository = getManager().getRepository(Piso);
  const piso = await pisoRepository.findOne(id);
  if (!piso) {
    res.status(404);
    res.end();
    return;
  }
  if (descripcion) {
    piso.descripcion = descripcion;
  }
  pisoRepository.update({ id }, piso);
  res.send(piso);
}
export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;
  const pisoRepository = getManager().getRepository(Piso);
  const piso = await pisoRepository.findOne(id);
  if (!piso) {
    res.status(404);
    res.end();
    return;
  }
  pisoRepository.delete({ id: piso.id });
  res.send(piso);
}

