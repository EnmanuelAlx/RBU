import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Persona } from './persona';
import { Sala } from './sala';

@Entity('tipo_sala', { schema: 'biblioteca' })
export class TipoSala {
  @PrimaryGeneratedColumn({
    name: 'id'
  })
  public id: number;

  @Column('varchar', {
    name: 'tipo',
    nullable: true
  })
  public descripcion: string | null;

  @OneToMany(
    type => Sala,
    (sala$: Sala) => {
      return sala$.idTipo;
    },
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }
  )
  public salas: Sala[];
}
