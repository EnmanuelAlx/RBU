import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { TipoOfertaAcademica } from '../entities/tipo_oferta_academica';

export async function getAll(req: Request, res: Response) {
  const TipoOfertaAcademicaRepository = getManager().getRepository(TipoOfertaAcademica);
  const tipoofertasAcademicas = await TipoOfertaAcademicaRepository.find();

  res.send(tipoofertasAcademicas);
}
export async function getById(req: Request, res: Response) {
  const OfertaAcademicaRepository = getManager().getRepository(TipoOfertaAcademica);
  const ofertaAcademica = await OfertaAcademicaRepository.findOne(req.params.id);

  if (!ofertaAcademica) {
    res.status(404);
    res.end();
    return;
  }
  res.send(ofertaAcademica);
}
export async function add(req: Request, res: Response) {
  const OfertaAcademicaRepository = getManager().getRepository(TipoOfertaAcademica);
  const ofertaAcademica = req.body;
  OfertaAcademicaRepository.insert(ofertaAcademica).then((ofertaAcademica$) => {

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
export async function update(req: Request, res: Response) {
  const { descripcion } = req.body;
  const { id } = req.params;
  const OfertaAcademicaRepository = getManager().getRepository(TipoOfertaAcademica);
  const ofertaAcademica = await OfertaAcademicaRepository.findOne(id);
  if (!ofertaAcademica) {
    res.status(404);
    res.end();
    return;
  }
  if (descripcion) {
    ofertaAcademica.descripcion = descripcion;
  }
  OfertaAcademicaRepository.update({ id }, ofertaAcademica);
  res.send(ofertaAcademica);
}

export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;
  const OfertaAcademicaRepository = getManager().getRepository(TipoOfertaAcademica);
  const ofertaAcademica = await OfertaAcademicaRepository.findOne(id);

  if (!ofertaAcademica) {
    res.status(404);
    res.end();
    return;
  }
  OfertaAcademicaRepository.delete({ id: ofertaAcademica.id });
  res.send(ofertaAcademica);
}
