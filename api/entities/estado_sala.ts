import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sala } from './sala';

@Entity('estado_sala', { schema: 'biblioteca' })
export class EstadoSala {

    @PrimaryGeneratedColumn({
        name: 'id',
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
