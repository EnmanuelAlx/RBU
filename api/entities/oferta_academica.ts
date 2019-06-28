import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Persona } from './persona';
import { TipoOfertaAcademica } from './tipo_oferta_academica';

@Entity('oferta_academica', { schema: 'biblioteca' })
@Index('fk_oferta_academica_tipo_oferta_academica_1', ['idTipo',])
export class OfertaAcademica {

    @PrimaryGeneratedColumn({
        name: 'id',
    })
    public id: number;

    @Column('varchar', {
        name: 'descripcion',
        nullable: true,
    })
    public descripcion: string | null;

    @ManyToOne(() => TipoOfertaAcademica, (tipoOfertaAcademica$) => {
        return tipoOfertaAcademica$.ofertaAcademicas;
    }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'id_tipo' })
    public idTipo: TipoOfertaAcademica | null;

    @OneToMany(() => Persona, (persona) => persona.idOfertaAcademica, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    public personas: Persona[];

}
