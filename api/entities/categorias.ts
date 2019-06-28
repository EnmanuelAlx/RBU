import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Persona } from './persona';

@Entity('categorias', { schema: 'biblioteca' })
export class Categorias {

    @PrimaryGeneratedColumn({
        name: 'id',
    })
    public id: number;

    @Column('varchar', {
        name: 'descripcion',
        nullable: true,
    })
    public descripcion: string | null;

    @OneToMany((type) => Persona, (persona$: Persona) => {
        return persona$.idCategoria;
    }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    public personas: Persona[];

}
