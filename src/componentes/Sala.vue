<template>
    <div>
        <v-card hover :color="colors[estado]" @click="openModal">
            <v-card-title primary-title class="justify-center">
                <div>
                    <h3>{{ nombre }}</h3>
                    <h4>Tipo: {{ tipo }}</h4>
                    <h4>Piso: {{ piso }}</h4>
                    <h4 v-if="horaFin">Tiempo restante {{ horaFinalizacion }}</h4>
                </div>
            </v-card-title>
            <v-card-actions class="justify-center">
                <v-btn color="red" @click="liberar">liberar</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog
            v-model="dialog"
            max-width="800px"
            
            transition="dialog-transition"
        >
            <form-sala 
                v-if="dialog"
                :cantidad="capacidad"
                :nombre="nombre"
                :idSala="id"
                :idReserva="idReservacion"
                :estado="estado"
                v-on:reserva="reserva"
                v-on:desocuparSala="desocuparSala"
            />

        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import formSala from './Reserva.vue'
import moment from 'moment'
import { clearInterval, setInterval, clearTimeout } from 'timers';
    export default {
        name: "Sala",
        components: {
            formSala,
        },
        props: {
            id:{
                type: Number,
                required: true
            },
            nombre: {
                type: String,
                default: 'Sala sin nombre'
            },
            piso:{
                type: Number,
                default: 1,
            },
            estadoInicial:{
                type: Number,
                default: 1,
            },
            tipo:{
                type: String,
                default: 0,
            },
            reservaciones:{
                type: Array
            },
            capacidad:{
                type:Number,
            },
            idReservacionInit:{
                type:Number,
                default: null
            },
            horaFinInit:{
                type:String,
            }
        },
        data() {
            return {
                colors: [
                    '#000000',
                    'success',
                    '#822f14',
                    '#DBA901'
                ],
                estado: this.estadoInicial,
                dialog: false,
                personas:[],
                idReservacion: this.idReservacionInit,
                horaFin: this.horaFinInit,
                horaFinalizacion: this.horaFin 
            }
        },
        created () {
            this.timer();
        },
        methods: {
            liberar(){
                if(confirm(`Seguro que desea liberar la sala ${this.nombre}`)){
                    axios.post(`${this.$api}/salas/liberar`,{
                        id: this.id,
                        idEstado: 1
                    })
                    .then(res=>{
                        this.estado = res.data.idEstado
                        this.horaFin = null;
                    })
                    .catch(err=>{
                        alert('Error al liberar la sala, contacte con el CGTI')
                    })
                }
            },
            openModal(){
                this.dialog = true
            },
            reserva(data){
                console.log(data);
                this.idReservacion = data.idReservacion,
                this.horaFin = data.horaFin
                this.dialog = false;
                this.estado = 2;
                this.timer();
            },
            desocuparSala(id){
                this.dialog = false;
                this.estado = 1;
                this.horaFin = null;
            },
            timer(){
                if(this.horaFin){
                    this.horaFin = this.horaFin.split(':');
                    let final = moment().hours(this.horaFin[0]);
                    final.minute(this.horaFin[1]);
                    let myTimer = setInterval(() => {
                        let inicio = moment();
                        let duracion = final.diff(inicio)
                        let intervalo = 1000
                        let duration = moment.duration(duracion - intervalo, 'milliseconds')
                        
                        this.horaFinalizacion = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
                        if(duracion<0){
                            clearInterval(myTimer);
                            this.horaFinalizacion = 0;
                            this.estado = 3
                        }
                    }, 1000);

                }
            }
        },
    }
</script>

<style scoped>

</style>