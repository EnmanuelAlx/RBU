// tslint:disable-next-line:max-line-length
import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Categorias } from './categorias';
import { OfertaAcademica } from './oferta_academica';
import { PersonasReservacion } from './personas_reservacion';

@Entity('persona', { schema: 'biblioteca' })
@Index('fk_personas_categorias_1', ['idCategoria',])
@Index('fk_personas_oferta_academica_1', ['idOfertaAcademica',])
export class Persona {

    @Column('int', {
        name: 'id',
        nullable: false,
        primary: true,
    })
    public id: number;

    @Column('varchar', {
        name: 'nombres',
        nullable: true,
    })
    public nombres: string | null;

    @Column('varchar', {
        name: 'apellidos',
        nullable: true,
    })
    public apellidos: string | null;

    @ManyToOne((type) => OfertaAcademica, (ofertaAcademica) => {
        return ofertaAcademica.personas;
    }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'id_oferta_academica' })
    public idOfertaAcademica: OfertaAcademica | null;

    @ManyToOne((type) => Categorias, (categorias$: Categorias) => {
        return categorias$.personas;
    }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'id_categoria' })
    public idCategoria: Categorias | null;

    @OneToMany((type) => PersonasReservacion, (personasReservacion$) => {
        return personasReservacion$.idPersona;
    }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    public personasReservacions: PersonasReservacion[];

}
