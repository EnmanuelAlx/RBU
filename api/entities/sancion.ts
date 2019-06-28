import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PersonasReservacion } from './personas_reservacion';

@Entity('sancion', { schema: 'biblioteca' })
@Index('fk_sanciones_personas_reservacion_1', ['idPersonaReservacion'])
export class Sancion {

    @Column('int', {
        name: 'id',
        nullable: false,
        primary: true,
    })
    public id: number;

    @ManyToOne(() => PersonasReservacion, (personasReservacion$) => {
        return personasReservacion$.sancions;
    }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'id_persona_reservacion' })
    public idPersonaReservacion: PersonasReservacion | null;

    @Column('date', {
        name: 'fecha_inicio',
        nullable: true,
    })
    public fechaInicio: string | null;

    @Column('date', {
        name: 'fecha_fin',
        nullable: true,
    })
    public fechaFin: string | null;

    @Column('varchar', {
        name: 'descripcion',
        nullable: true,
    })
    public descripcion: string | null;

}
