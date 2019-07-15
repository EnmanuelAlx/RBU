import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp
} from "typeorm";
import { PersonasReservacion } from "./personas_reservacion";
import { Sala } from "./sala";

@Entity("reservacion", { schema: "biblioteca" })
@Index("fk_reservaciones_salas_1", ["idSala"])
export class Reservacion {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  public id: number;

  @ManyToOne(() => Sala, sala => sala.reservacions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
  })
  @JoinColumn({ name: "id_sala" })
  public idSala: Sala | null;

  @Column("date", {
    name: "fecha",
    nullable: true
  })
  public fecha: string | null;

  @Column("time", {
    name: "hora_inicio",
    nullable: true
  })
  public horaInicio: Timestamp | null;

  @Column("time", {
    name: "hora_fin",
    nullable: true
  })
  public horaFin: Timestamp | null;
  
  @Column("time", {
    name: "beca",
    nullable: true
  })
  public beca: string | null;

  @OneToMany(
    () => PersonasReservacion,
    (personasReservacion$: PersonasReservacion) => {
      return personasReservacion$.idReservacion;
    },
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  public personasReservacions: PersonasReservacion[];
}
