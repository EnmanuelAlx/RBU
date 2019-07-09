import { Request, Response } from "express";
import { getManager, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Between } from "typeorm";
import { Sancion } from "../entities/sancion";

export default {
  async getReport(req: Request, res: Response) {
    const SancionRepository = getManager().getRepository(Sancion);
    const sancionReport = await SancionRepository.find({
      relations: ["idPersonaReservacion"]
    });
    res.send(sancionReport);
  },
  // Get Todas las Sanciones segun un rango especifico Begin = Dia de Inicio / End Dia Fin de la Busqueda
  async getReportByDate(req: Request, res: Response) {
    const SancionRepository = getManager().getRepository(Sancion);
    console.log(req.body)
    let { fechaInicio, fechaFin } = req.body;
    const sancionReport = await SancionRepository.find({
      where:[
        {fechaInicio: MoreThanOrEqual(fechaInicio), fechaFin: LessThanOrEqual(fechaFin)}
      ],
      relations: ['idPersonaReservacion']
    })
    
    res.send(sancionReport);
  },
  async add(req: Request, res: Response) {
    const sancionRepository = getManager().getRepository(Sancion);
    const sancion = req.body.sancion;
    sancionRepository.insert(sancion).then(sancion$ => {
      res.send({
        sancion$
      });
    });

    if (!sancion) {
      res.status(404);
      res.end();
      return;
    }
  }
};
