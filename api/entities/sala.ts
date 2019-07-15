import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { EstadoSala } from './estado_sala';
import { Piso } from './piso';
import { Reservacion } from './reservacion';
import { TipoSala } from './tipo_sala';

export enum SalaRelations {
  idPiso = 'idPiso',
  idEstado = 'idEstado',
  reservacions = 'reservacions',
  idTipo = 'idTipo'
}

@Entity('sala', { schema: 'biblioteca' })
@Index('fk_salas_pisos_1', ['idPiso'])
@Index('fk_salas_estados_salas_1', ['idEstado'])
@Index('fk_salas_tipos_salas_1', ['idTipo'])
export class Sala {
  @PrimaryGeneratedColumn({
    name: 'id'
  })
  public id: number;

  @Column({
    name: 'nombre'
  })
  public nombre: string;
  
  @Column({
    name: 'max_personas'
  })
  public capacidad: number;

  @ManyToOne(() => Piso, piso$ => piso$.salas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_piso' })
  public idPiso: Piso | null;

  @ManyToOne(() => EstadoSala, estadoSala$ => estadoSala$.salas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_estado' })
  public idEstado: EstadoSala | null;

  @ManyToOne(() => TipoSala, tipoSala$ => tipoSala$.salas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_tipo' })
  public idTipo: TipoSala | null;

  @OneToMany(() => Reservacion, reservacion$ => reservacion$.idSala, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({name: 'id_sala'})
  public reservacions: Reservacion[];

  public idReservacion : Number;
}
