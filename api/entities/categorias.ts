import { Column, Entity, OneToMany } from 'typeorm';
import { Persona } from './persona';

@Entity('categorias', { schema: 'biblioteca' })
export class Categorias {

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

    @OneToMany((type) => Persona, (persona$: Persona) => {
        return persona$.idCategoria;
    }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    public personas: Persona[];

}
