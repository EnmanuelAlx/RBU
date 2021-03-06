import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { OfertaAcademica } from '../entities/oferta_academica';

export default {
  async getAll(req: Request, res: Response) {
    const OfertaAcademicaRepository = getManager().getRepository(OfertaAcademica);
    const ofertasAcademicas = await OfertaAcademicaRepository.find({
      relations: ['idTipo']
    });

    res.send(ofertasAcademicas);
  },
  async getById(req: Request, res: Response) {
    const OfertaAcademicaRepository = getManager().getRepository(OfertaAcademica);
    const ofertaAcademica = await OfertaAcademicaRepository.findOne(req.params.id);

    if (!ofertaAcademica) {
      res.status(404);
      res.end();
      return;
    }
    res.send(ofertaAcademica);
  },
  async add(req: Request, res: Response) {
    const OfertaAcademicaRepository = getManager().getRepository(OfertaAcademica);
    const ofertaAcademica = req.body;
    console.log(ofertaAcademica.idTipo);
    OfertaAcademicaRepository.insert(ofertaAcademica).then((ofertaAcademica$) => {
      
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

  },
  async update(req: Request, res: Response) {
    console.log(req.body);
    const { descripcion, idTipo } = req.body;
    const { id } = req.params;
    const OfertaAcademicaRepository = getManager().getRepository(OfertaAcademica);
    const ofertaAcademica = await OfertaAcademicaRepository.findOne(id);
    if (!ofertaAcademica) {
      res.status(404);
      res.end();
      return;
    }
    if (descripcion) {
        ofertaAcademica.descripcion = descripcion;
        ofertaAcademica.idTipo = idTipo
    }
    OfertaAcademicaRepository.update({ id }, ofertaAcademica);
    res.send(ofertaAcademica);
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const OfertaAcademicaRepository = getManager().getRepository(OfertaAcademica);
    const ofertaAcademica = await OfertaAcademicaRepository.findOne(id);
    
    if (!ofertaAcademica) {
      res.status(404);
      res.end();
      return;
    }
    OfertaAcademicaRepository.delete({ id: ofertaAcademica.id });
    res.send(ofertaAcademica);
  }
};
