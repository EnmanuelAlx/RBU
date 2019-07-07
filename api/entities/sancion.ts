import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Persona } from './persona';

@Entity('sancion', { schema: 'biblioteca' })
@Index('fk_sanciones_personas_reservacion_1', ['idPersonaReservacion'])
export class Sancion {

    @PrimaryGeneratedColumn({
        name: 'id',
    })
    public id: number;

    @ManyToOne(() => Persona, (personasReservacion$) => {
        return personasReservacion$.nombres;
    }, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

    @JoinColumn({ name: 'id_persona_reservacion' })
    public idPersonaReservacion: Persona | null;

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
