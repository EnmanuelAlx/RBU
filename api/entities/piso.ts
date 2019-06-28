import { Column, Entity, OneToMany } from 'typeorm';
import { Sala } from './sala';

@Entity('piso', { schema: 'biblioteca' })
export class Piso {

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

    @OneToMany(() => Sala, (sala) => sala.idPiso, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    public salas: Sala[];

}
