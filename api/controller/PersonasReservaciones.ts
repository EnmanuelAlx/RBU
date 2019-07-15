import { Request, Response } from "express";
import { getManager, InsertResult } from "typeorm";
import {
  PersonasReservacion,
  PersonasReservacionRelations
} from "../entities/personas_reservacion";

export default {
  async getAll(req: Request, res: Response) {
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const personasReservacion = await PersonasReservacionRepository.find({
      relations: [
        PersonasReservacionRelations.idPersona,
        PersonasReservacionRelations.idReservacion,
        PersonasReservacionRelations.sancions
      ]
    });
    res.send(personasReservacion);
  },
  async getById(req: Request, res: Response) {
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const personasReservacion = await PersonasReservacionRepository.findOne(
      req.params.id,
      {
        relations: [
          PersonasReservacionRelations.idPersona,
          PersonasReservacionRelations.idReservacion,
          PersonasReservacionRelations.sancions
        ]
      }
    );

    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }
    res.send(personasReservacion);
  },
  
  async update(req: Request, res: Response) {
    const {} = req.body;

    const { id } = req.params;
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const personasReservacion: PersonasReservacion = await PersonasReservacionRepository.findOne(
      id
    );
    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }

    for (const key in req.body) {
      if (personasReservacion.hasOwnProperty(key)) {
        personasReservacion[key] = req.body[key];
      }
    }
    PersonasReservacionRepository.update({ id }, personasReservacion);
    res.send(personasReservacion);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const personasReservacion = await PersonasReservacionRepository.findOne(id);
    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }
    PersonasReservacionRepository.delete({ id: personasReservacion.id });
    res.send(personasReservacion);
  },
  async getPersonasByReservacionID(req: Request, res: Response) {
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const { idReservacion } = req.body;
    const fechaActual = new Date();
    
    
    const año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth()+1;
    let dia = fechaActual.getDate();
    if(mes<10){
      mes = `0${mes}`
    }
    if(dia<10){
      dia = `0${dia}`
    }
    const diaActual = `${año}-${mes}-${dia}`
    let tiempoActual = `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;
    const personasReservacion = await PersonasReservacionRepository.createQueryBuilder(
      "PersonasReservacion"
    )
      .select(
        "Persona.nombres as nombres, Persona.cedula as cedula, Persona.apellidos as apellidos, Persona.id_oferta_academica AS idOfertaAcademica, Persona.id_categoria AS idCategoria, esResponsable AS responsable, estaEnSala, Reservacion.beca,Reservacion.hora_fin"
      )
      .leftJoin("PersonasReservacion.idReservacion", "Reservacion")
      .leftJoin("PersonasReservacion.idPersona", "Persona")
      .where("Reservacion.id = :ID", { ID: idReservacion })
      .andWhere("Reservacion.fecha = :diaActual", { diaActual: diaActual })
      .andWhere("Reservacion.hora_inicio <= :tiempoInicio", {tiempoInicio: tiempoActual})
      .andWhere("Reservacion.hora_fin >= :tiempoActual", {tiempoActual: tiempoActual})
      .orderBy('PersonasReservacion.esResponsable', 'DESC')
      .getRawMany();

    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }
    res.send(personasReservacion);
  },
};
