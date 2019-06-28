import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OfertaAcademica } from './oferta_academica';

@Entity('tipo_oferta_academica', { schema: 'biblioteca' })
export class TipoOfertaAcademica {

    @PrimaryGeneratedColumn({
        name: 'id',
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
