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
  async getPersonasByReservacionID(req: Request, res: Response) {
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const fechaActual = new Date();
    const tiempoActual =
      fechaActual.getHours() +
      ":" +
      fechaActual.getMinutes() +
      ":" +
      fechaActual.getSeconds();
    const diaActual =
      fechaActual.getFullYear() +
      "-" +
      (fechaActual.getMonth() + 1) +
      "-" +
      fechaActual.getDate();

    const personasReservacion = await PersonasReservacionRepository.createQueryBuilder(
      "PersonasReservacion"
    )
      .select(
        "Persona.nombres as Nombre, Persona.apellidos as Apellidos, Persona.id_oferta_academica AS OfertaAcademica, Persona.id_categoria AS Categoria, esResponsable, estaEnSala, Reservacion.beca"
      )
      .leftJoin("PersonasReservacion.idReservacion", "Reservacion")
      .leftJoin("PersonasReservacion.idPersona", "Persona")
      .leftJoin("Reservacion.idSala", "Sala")
      .where("Reservacion.id = :ID", { ID: 2 })
      .andWhere("Reservacion.fecha = :diaActual", { diaActual: diaActual })
      .andWhere("Reservacion.hora_inicio <= :tiempoActual", {
        tiempoActual: tiempoActual
      })

      .andWhere("Reservacion.hora_fin >= :tiempoActual", {
        tiempoActual: tiempoActual
      })
      .andWhere("Sala.id_estado = 2")
      .getRawMany();

    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }
    res.send(personasReservacion);
  },
  async getPersonasByNombre(req: Request, res: Response) {
    const nombres = "...";
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const fechaActual = new Date();
    const tiempoActual =
      fechaActual.getHours() +
      ":" +
      fechaActual.getMinutes() +
      ":" +
      fechaActual.getSeconds();
    const diaActual =
      fechaActual.getFullYear() +
      "-" +
      (fechaActual.getMonth() + 1) +
      "-" +
      fechaActual.getDate();

    const personasReservacion = await PersonasReservacionRepository.createQueryBuilder(
      "PersonasReservacion"
    )
      .select(
        "Sala.nombre as Sala, Persona.nombres as Nombre, Persona.apellidos as Apellidos"
      )
      .leftJoin("PersonasReservacion.idReservacion", "Reservacion")
      .leftJoin("Reservacion.idSala", "Sala")
      .leftJoin("PersonasReservacion.idPersona", "Persona")
      .where("Reservacion.fecha = :diaActual", { diaActual: diaActual })
      .andWhere("Reservacion.hora_inicio <= :tiempoActual", {
        tiempoActual: tiempoActual
      })

      .andWhere("Reservacion.hora_fin >= :tiempoActual", {
        tiempoActual: tiempoActual
      })
      .andWhere("Persona.nombres LIKE :nombres", {
        nombres: "%" + nombres + "%"
      })
      .getRawMany();

    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }
    res.send(personasReservacion);
  },
  async add(req: Request, res: Response) {
    const PersonasReservacionRepository = getManager().getRepository(
      PersonasReservacion
    );
    const personasReservacion: PersonasReservacion = req.body;
    PersonasReservacionRepository.insert(personasReservacion).then(
      (personasReservacion$: InsertResult) => {
        res.send({
          id: personasReservacion$.raw.insertId
        });
      }
    );

    if (!personasReservacion) {
      res.status(404);
      res.end();
      return;
    }
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
  }
};
