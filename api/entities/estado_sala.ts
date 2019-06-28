import { Column, Entity, OneToMany } from 'typeorm';
import { Sala } from './sala';

@Entity('estado_sala', { schema: 'biblioteca' })
export class EstadoSala {

    @Column('int', {
        name: 'id',
        nullable: false,
        primary: true,
    })
    public id: number;

    @Column('varchar', {
        name: 'descripcion',
        nullable: true,
    })
    public descripcion: string | null;

    @OneToMany(() => Sala, (sala$: Sala) => sala$.idEstado, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    public salas: Sala[];

}
