import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EstadoSala } from './estado_sala';
import { Piso } from './piso';
import { Reservacion } from './reservacion';

@Entity('sala', { schema: 'biblioteca' })
@Index('fk_salas_pisos_1', ['idPiso'])
@Index('fk_salas_estados_salas_1', ['idEstado'])
export class Sala {

    @Column('int', {
        name: 'id',
        nullable: false,
        primary: true,
    })
    public id: number;

    @ManyToOne(() => Piso, (piso$) => piso$.salas, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'id_piso' })
    public idPiso: Piso | null;

    @ManyToOne(() => EstadoSala, (estadoSala$) => estadoSala$.salas, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'id_estado' })
    public idEstado: EstadoSala | null;

    @OneToMany(() => Reservacion, (reservacion$) => reservacion$.idSala, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    public reservacions: Reservacion[];

}
