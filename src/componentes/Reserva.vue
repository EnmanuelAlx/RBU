<template>
    <div>
        <v-card>
            <v-card-title primary-title class="justify-center">
                <div>
                    <h3 class="headline mb-0">{{ nombre }}</h3>
                </div>
            </v-card-title>
            <v-container grid-list-xs>
                <h3>Responsable</h3>
                <v-layout row wrap>
                    <v-flex xs3>
                        <v-text-field
                            label="nombre"
                            v-model="ArrPersonas[0].nombres"
                        ></v-text-field>
                    </v-flex>
                    <v-spacer/>                    
                    <v-flex xs3>
                        <v-text-field
                            label="Cedula"
                            v-model="ArrPersonas[0].cedula"
                        ></v-text-field>
                    </v-flex>
                    <v-spacer/>
                    <v-flex xs2>
                        <v-select
                        :items="categorias"
                        label="Categoria"
                        outline
                        item-text="descripcion"
                        item-value="id"
                        v-model="ArrPersonas[0].idCategoria"
                        ></v-select>
                    </v-flex>
                    <v-flex xs2>
                        <v-select
                        :items="ofertasAcademicas"
                        label="Oferta Academica"
                        outline
                        item-text="descripcion"
                        item-value="id"
                        v-model="ArrPersonas[0].idOfertaAcademica"
                        ></v-select>
                    </v-flex>
                    <!-- <v-flex xs1 v-if="personas.length>1">
                        <v-btn fab small color="red"><v-icon>clear</v-icon></v-btn>
                    </v-flex> -->
                </v-layout>
                <v-divider/>
                <h3>Otros</h3>
                <v-layout row v-for="(cant, i) in cantidad-1" :key="cant">
                    <!-- <v-flex xs3 v-for="persona in personas" :key="persona.id">
                        <v-text-field
                            name="name"
                            :value="persona.nombres"
                            id="id"
                        ></v-text-field>
                    </v-flex> -->
                        <v-flex xs3>
                            <v-text-field
                                label="Nombre"
                                v-model="ArrPersonas[i+1].nombres"
                            ></v-text-field>
                        </v-flex>
                        <v-spacer/>
                        <v-flex xs3>
                            <v-text-field
                                label="Cedula"
                                v-model="ArrPersonas[i+1].cedula"
                            ></v-text-field>
                        </v-flex>
                        <v-spacer/>
                        <v-flex xs2>
                            <v-select
                            :items="categorias"
                            label="Categoria"
                            outline
                            item-text="descripcion"
                            item-value="id"
                            v-model="ArrPersonas[i+1].idCategoria"
                            ></v-select>
                        </v-flex>
                        <v-flex xs2>
                            <v-select
                            :items="ofertasAcademicas"
                            label="Oferta Academica"
                            outline
                            item-text="descripcion"
                            item-value="id"
                            v-model="ArrPersonas[i+1].idOfertaAcademica"
                            ></v-select>
                        </v-flex>
                        <!-- <v-flex xs1 v-if="personas.length>1">
                            <v-btn fab small color="red"><v-icon>clear</v-icon></v-btn>
                        </v-flex> -->
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs4>
                    <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="horaFin"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="horaFin"
                            label="Hora de salida"
                            prepend-icon="access_time"
                            readonly
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="menu2"
                        v-model="horaFin"
                        full-width
                        @click:minute="$refs.menu.save(horaFin)"
                        ></v-time-picker>
                    </v-menu>
                </v-flex>
                <v-spacer/>
                <v-divider vertical/>
                <v-spacer></v-spacer>
                <v-flex xs5>
                    <v-text-field outline label="Becatrabajo de turno" v-model="beca"></v-text-field>
                </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions class="justify-center">
                <v-btn color="success" @click="reservar" v-if="personas.length == 0">Reservar</v-btn>
                <v-btn color="success" @click="liberarCompleta" v-if="personas.length > 0">Liberar</v-btn>
                <v-btn color="red" @click="$emit('closeModal')">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:"Reserva",
        props: {
            nombre:{
                type: String,
            },
            cantidad:{
                type: Number
            },
            idSala:{
                type: Number
            },
            idReserva:{
                type: Number || null,
                default: null
            },
            estado:{
                type: Number || null,
                default: null
            }
        },
        created () {
            this.createdArray();
            this.getCategorias();
            this.getOfertaAcademica();
            this.getPersonas();
        },
        data() {
            return {
                ArrPersonas:[],
                name:"",
                cedula:"",
                categoria: 0,
                categorias: [],
                horaFin:'',
                menu2: false,
                ofertasAcademicas:[],
                beca: '',
                personas: []
            }
        },
        methods: {
            createdArray() {
                for (let i = 0; i < this.cantidad; i++) {
                    this.ArrPersonas.push({nombres:"", cedula:"", idCategoria: '', responsable:0, estaEnSala : 1, idOfertaAcademica: ''});                    
                }
            },
            getCategorias(){
                axios.get(`${this.$api}/categorias`)
                .then(res=>{
                    this.categorias = res.data;
                })
                .catch(err=>{
                    alert('Hubo un error, contacte al CGTI1')
                });
            },
            getOfertaAcademica(){
                axios.get(`${this.$api}/ofertasAcademicas`)
                .then(res => {
                    this.ofertasAcademicas = res.data
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            getPersonas(){
                if (this.estado != 1) {
                    axios.post(`${this.$api}/reservacion/personasEnReservacion`,{
                        idReservacion: this.idReserva
                    })
                    .then(res => {
                        console.log(res.data);
                        this.personas = res.data;
                        this.beca = res.data[0].beca
                        this.horaFin = res.data[0].hora_fin
                        this.ArrPersonas[0] = this.personas[0];
                        for (let i = 1; i < this.personas.length; i++) {
                            this.ArrPersonas[i] = this.personas[i]
                        }
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                }
            },
            reservar(){
                let fechaActual = new Date();
                this.ArrPersonas[0].responsable = 1;
                axios.post(`${this.$api}/reservar`,{
                    personasReservacions: this.ArrPersonas,
                    horaFin: this.horaFin,
                    horaInicio: `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`,
                    idSala: this.idSala,
                    fecha: `${fechaActual.getFullYear()}-${fechaActual.getMonth()+1}-${fechaActual.getDate()}`,
                    beca: this.beca
                })
                .then(res => {
                    this.$emit('reserva', res.data)
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            liberarCompleta(){
                if(confirm("¿Seguro que todos los participantes han desalojado la sala?")){
                    axios.post(`${this.$api}/sala/desocupar`,{
                        idReservacion: this.idReserva
                    })
                    .then(res => {
                        this.$emit('desocuparSala', 1);
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                }
            }
        },
    }
</script>
