import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sala } from './sala';

@Entity('piso', { schema: 'biblioteca' })
export class Piso {

    @PrimaryGeneratedColumn({
        name: 'id',
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
