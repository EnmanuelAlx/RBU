import { Column, Entity, OneToMany } from 'typeorm';
import { OfertaAcademica } from './oferta_academica';

@Entity('tipo_oferta_academica', { schema: 'biblioteca' })
export class TipoOfertaAcademica {

    @Column('int', {
        name: 'id',
        nullable: false,
        primary: true,
    })
    public id: number;

    @Column('varchar', {
        name: 'nombre',
        nullable: true,
    })
    public nombre: string | null;

    @OneToMany(() => OfertaAcademica, (ofertaAcademica$) => {
        return ofertaAcademica$.idTipo;
    }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    public ofertaAcademicas: OfertaAcademica[];

}
