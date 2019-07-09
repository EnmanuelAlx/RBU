<template>
    <div>
        <v-toolbar flat color="#212121">
            <v-toolbar-title>Sanciones Activas</v-toolbar-title>
            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            
            
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>

            <v-btn color="primary" dark class="mb-2" @click="filter = true">Filtrar Sanciones Activas</v-btn>

        </v-toolbar>

        <v-dialog v-model="filter" max-width="500px">
            <v-card>
                <v-container grid-list-md>
                    <v-layout row wrap>
                    <v-flex xs12 lg6>
                        <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="date"
                                    hint="Fecha de inicio"
                                    persistent-hint
                                    prepend-icon="event"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                        </v-menu>
                    </v-flex>
        
                <v-flex xs12 lg6>
                <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="date2"
                        hint="Fecha fin"
                        persistent-hint
                        prepend-icon="event"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
                </v-flex>
            </v-layout>
            </v-container>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="success" @click="filtrar">Filtrar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>


        <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        class="elevation-1"
        >
        <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.idPersonaReservacion.nombres }}</td>
            <td class="text-xs-left">{{ props.item.idPersonaReservacion.apellidos }}</td>
            <td class="text-xs-left">{{ props.item.fechaInicio }}</td>
            <td class="text-xs-left">{{ props.item.fechaFin }}</td>
            <td class="text-xs-left">{{ props.item.descripcion }}</td>
            <!-- <td class="text-xs-right">
            <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
            >
                edit
            </v-icon>
            <v-icon
                small
                @click="deleteItem(props.item)"
            >
                delete
            </v-icon>
            </td> -->
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Consultar de nuevo</v-btn>
        </template>
        </v-data-table>
        <v-btn color="primary" dark class="mb-2" @click="imprimir">Imprimir Sanciones Activas</v-btn>
        <v-btn color="primary" dark class="mb-2" @click="reestablecer">Reestablecer</v-btn>

    </div>
</template>

<script>
import axios from 'axios';
import { log } from 'util';
export default {
    name: 'ReporteSanciones',
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            date2: '',
            menu1: false,
            menu2: false,
            filter: false,
            search: '',
            dialog: false,
            headers: [
                {
                    text: 'Nombres',
                    align: 'left',
                    value: 'idPersonaReservacion.nombres'
                },
                { text: 'Apellidos', value: 'idPersonaReservacion.apellidos', sortable: true, },
                { text: 'Fecha Inicio', value: 'fechaInicio', sortable: true, },
                { text: 'Fecha Fin', value: 'fechaFin', sortable: true, },
                { text: 'Descripcion', value: 'descripcion', sortable: true, },
            
            ],
            desserts: [],
            descripcion: '',
            defaultItem: {
                descripcion: '',
            },
            reportes: {
                nombres: '',
                apellidos: '',
                fechaInicio: null,
                fechaFin: null,
                descripcion: ''
            }
    }),
    created () {
        this.initialize()
    },

    methods: {
        initialize () {
            this.desserts = [];
            axios.get(`${this.$api}/reportes/sanciones`)
            .then(res=>{
                this.desserts = res.data;
                console.log(res.data);
            })
            .catch(err=>{
                alert('Hubo un error, contacte al CGTI')
            });
        },

        // deleteItem (item) {
        //     console.log(item.id);
        //     if(confirm(`Seguro que desea eliminar ${item.descripcion}`)){
        //         axios.delete(`${this.$api}/reportes/${item.id}`)
        //         .then(res=>{
        //             let index = this.desserts.indexOf(res.data);
        //             this.desserts.splice(index, 1);
        //         })
        //         .catch(err=>{
        //             alert('Hubo un error, contacte al CGTI')
        //         });
        //     }
        // },

        close () {
            this.dialog = false;
            this.dialogEdit = false;
        },
        filtrar(){
            let fechaInicio = this.date;
            let fechaFin = this.date2;
            console.log(fechaInicio, fechaFin);
            axios.post(`${this.$api}/reportes/sanciones/fecha`,{
                fechaInicio,
                fechaFin,
            }).then(res=>{
                if(res.data.length == 0){
                    alert("No existen sanciones en ese rango de fechas");
                    return;
                }
                this.filter = false;
                this.desserts = []
                this.desserts = res.data
            })
            .catch(err=>{
                alert('Hubo un problema al filtrar, contacte con el CGTI')
            });
        },
        imprimir(){
            
        },
        reestablecer(){
            this.initialize();
        }
        
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
