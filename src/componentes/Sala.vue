<template>
    <div>
        <v-card hover :color="colors[estado]" @click="openModal">
            <v-card-title primary-title class="justify-center">
                <div>
                    <h3>{{ nombre }}</h3>
                    <h4>Tipo: {{ tipo }}</h4>
                    <h4>Piso: {{ piso }}</h4>
                </div>
            </v-card-title>
            <v-card-actions class="justify-center">
                <!-- <v-btn color="red" @click="liberar">liberar</v-btn> -->
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
            }
        },
        data() {
            return {
                colors: [
                    '#000000',
                    'success',
                    '#822f14'
                ],
                estado: this.estadoInicial,
                dialog: false,
                personas:[],
                idReservacion: this.idReservacionInit
            }
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
                this.idReservacion = data,
                this.dialog = false;
                this.estado = 2;
            },
            desocuparSala(id){
                this.dialog = false;
                this.estado = 1;
            }
        },
    }
</script>

<style scoped>

</style>