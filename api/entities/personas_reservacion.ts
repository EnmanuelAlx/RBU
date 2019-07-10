import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Persona } from './persona';
import { Reservacion } from './reservacion';
import { Sancion } from './sancion';

export enum PersonasReservacionRelations {
  idReservacion = 'idReservacion',
  idPersona = 'idPersona',
  sancions = 'sancions'
}
@Entity('personas_reservacion', { schema: 'biblioteca' })
@Index('fk_personas_reservacion_personas_1', ['idPersona'])
@Index('fk_personas_reservacion_reservaciones_1', ['idReservacion'])
export class PersonasReservacion {
  @PrimaryGeneratedColumn({
    name: 'id'
  })
  public id: number;

  @ManyToOne(
    () => {
      return Reservacion;
    },
    reservacion$ => reservacion$.personasReservacions,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn({ name: 'id_reservacion' })
  public idReservacion: Reservacion | null;

  @ManyToOne(
    () => {
      return Persona;
    },
    persona$ => persona$.personasReservacions,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  @JoinColumn({ name: 'id_persona' })
  public idPersona: Persona | null;

  @Column('int', {
    name: 'esResponsable',
    nullable: true
  })
  public esResponsable: number | null;

  @Column('int', {
    name: 'estaEnSala',
    nullable: true
  })
  public estaEnSala: number | null;

  @Column('time', {
    name: 'hora_inicio',
    nullable: true
  })
  public horaInicio: string | null;

  @Column('time', {
    name: 'hora_fin',
    nullable: true
  })
  public horaFin: string | null;

  @OneToMany(
    () => Sancion,
    sancion$ => {
      return sancion$.idPersonaReservacion;
    },
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  public sancions: Sancion[];
}
