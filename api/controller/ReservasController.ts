import { Request, Response } from "express";
import { getManager, InsertResult } from "typeorm";
import { Reservacion } from "../entities/reservacion";
import { Persona } from '../entities/persona';
import { PersonasReservacion } from '../entities/personas_reservacion'
import { Sala } from "../entities/sala";

async function createPersonaReservacion(persona, idReservacion, horaInicio){
    const PersonasReservacionRepository = getManager().getRepository(PersonasReservacion);
    const { id, esResponsable } = persona;
    const personaReservacion = {
        idReservacion,
        idPersona: id,
        esResponsable,
        estaEnSala: 1,
        horaInicio,
    }
    return await PersonasReservacionRepository.insert(personaReservacion);
}
async function getByCedula(ele){
    const personaRepository = getManager().getRepository(Persona);
    const persona = await personaRepository.findOne({
        where:{
            cedula: ele.cedula
        }
    });
    if(persona){
        if(ele.responsable){
            persona.esResponsable = 1;
        }
        else{
            persona.esResponsable = 0;
        }
        return persona
    }
    else{
        const { nombres, cedula, idOfertaAcademica, idCategoria } = ele
        console.log(nombres, cedula);
        const newPersona = {
            nombres,
            cedula,
            idOfertaAcademica,
            idCategoria,
            apellidos:'',
            esResponsable: 0
        }
        return await personaRepository.insert(newPersona).then(persona$ => {
            return (newPersona);
        });
    }
    
}
async function estadoSala(id, estado){
    const SalaRepository = getManager().getRepository(Sala);
    const sala = await SalaRepository.findOne(id);
    sala.idEstado = estado;
    SalaRepository.update({ id }, sala);
    return id;
}

async function updatePersonasReservacion(persona){
    const PersonasReservacionRepository = getManager().getRepository(PersonasReservacion);
    const id = persona.id
    persona.estaEnSala = 0;
    PersonasReservacionRepository.update({ id }, persona);
    return persona
}
async function liberarSala(idReservacion: Reservacion){
    const ReservaRepository = getManager().getRepository(Reservacion);
    const reservacion = await ReservaRepository.findOne(idReservacion,{
        relations: ['idSala']
    });
    return await estadoSala(reservacion.idSala.id, 1);
}
export default {
    async getReport(req: Request, res: Response) {
        const ReservaRepository = getManager().getRepository(Reservacion);
        const reservacionesReport = await ReservaRepository.createQueryBuilder(
            "reservacion"
        )
            .select("COUNT(reservacion.id_sala) as CantidadReservas, YEAR(reservacion.fecha) as Year, MONTH(reservacion.fecha) as Month, DAY(reservacion.fecha) as Day")
            .leftJoinAndSelect("reservacion.idSala", "Sala")
            .groupBy("Sala.id")
            .getRawMany();

        res.send(reservacionesReport);
    },
    async getReportByDate(req: Request, res: Response) {
        let { fechaInicio, fechaFin } = req.body;    
        const ReservaRepository = getManager().getRepository(Reservacion);
        const reservacionesReport = await ReservaRepository.createQueryBuilder(
            "reservacion"
        )
            .select(
            "YEAR(reservacion.fecha) as Year, MONTH(reservacion.fecha) as Month, DAY(reservacion.fecha) as Day, COUNT(reservacion.id_sala) as CantidadReservas"
            )
            .where("fecha >= :fechaInicio", { fechaInicio: fechaInicio })
            .andWhere("fecha <= :fechaFin", { fechaFin: fechaFin })
            .leftJoinAndSelect("reservacion.idSala", "Sala")
            .groupBy("Sala.id")
            .addGroupBy("(fecha)")
            .orderBy("(fecha)")
            .getRawMany();

        res.send(reservacionesReport);
    },
    async reservarSala(req: Request, res:Response){
        const ReservaRepository = getManager().getRepository(Reservacion);
        const {idSala, fecha, horaInicio, horaFin, beca} = req.body;
        const personasNoFiltradas = req.body.personasReservacions
        const personas = [];
        await estadoSala(idSala,2)
        
        for (const ele of personasNoFiltradas) {
            if(ele.cedula != ""){
                const persona = await getByCedula(ele);
                personas.push(persona)
            }
        }
        console.log(personas);
        const reserva ={
            idSala,
            fecha,
            horaInicio,
            horaFin,
            beca
        }
        const { id } = await ReservaRepository.save(reserva);
        for (const element of personas) {
            await createPersonaReservacion(element, id, horaInicio);            
        }        
        res.status(200);
        res.send({idReservacion: id});
    },
    async desocupar(req: Request, res: Response){
        const { idReservacion } = req.body
        const personaReservacion = getManager().getRepository(PersonasReservacion);
        const reservacion = await personaReservacion.find({
            where:{
                idReservacion: idReservacion
            }
        });
        for (const element of reservacion) {
            await updatePersonasReservacion(element)
        }
        const idSala = await liberarSala(idReservacion);
        res.status(200);
        res.send({idSala});
    }
};

