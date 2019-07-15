<template>
    <div>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex xs3 v-for="sala in salas" :key="sala.id">
                    <sala :id="sala.id" 
                    :nombre="sala.nombre" 
                    :piso="sala.idPiso.id" 
                    :estadoInicial="sala.idEstado.id" 
                    :tipo="sala.idTipo.descripcion" 
                    :reservaciones="sala.reservacions" 
                    :capacidad="sala.capacidad"
                    :idReservacionInit="sala.idReservacion"/>
                </v-flex>
            </v-layout>
        </v-container>
        <v-btn color="success" @click="getSalas">text</v-btn>
    </div>
</template>

<script>
import Sala from '../componentes/Sala.vue'
import axios from 'axios'
    export default {
        components: {
            Sala,
        },
        data() {
            return {
                salas: [],

            }
        },
        created () {
            this.initialize();
            this.getSalas();
        },
        methods: {
            initialize() {
                
            },
            getSalas(){
                axios.get(`${this.$api}/salasReservacion`)
                .then(res=>{
                    this.salas = res.data;
                    console.log(this.salas);
                })
                .catch(err=>{
                    alert("Contacte con el cgti debido a problemas tecnicos")
                })
            }
        },
    }
</script>
