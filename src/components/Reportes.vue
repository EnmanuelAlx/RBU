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
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>

                <v-btn color="primary" dark class="mb-2" v-on="on" @click="filter = true">Filtrar Sanciones Activas</v-btn>
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="DoSome">Imprimir Sanciones Activas</v-btn>
                </template>
            </v-dialog>
        </v-toolbar>

        <v-dialog v-model="filter" max-width="500px">
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
             v-model="dateFormatted"
                 label="Date"
                 hint="MM/DD/YYYY format"
                 persistent-hint
                 prepend-icon="event"
                 @blur="date = parseDate(dateFormatted)"
                 v-on="on"
               ></v-text-field>
             </template>
             <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
           </v-menu>
           <p>Date in ISO format: <strong>{{ date }}</strong></p>
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
             v-model="dateFormatted"
                 label="Date"
                 hint="MM/DD/YYYY format"
                 persistent-hint
                 prepend-icon="event"
                 @blur="date2 = parseDate(dateFormatted)"
                 v-on="on"
               ></v-text-field>
             </template>
             <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
           </v-menu>
           <p>Date in ISO format: <strong>{{ date2 }}</strong></p>
         </v-flex>
       </v-layout>
     </v-container>
         </v-dialog>

        <v-dialog v-model="dialogEdit" max-width="500px">
            <v-card>
            <v-card-title>
                <span class="headline">Editar Sancion</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field v-model="itemEdit.descripcion" label="Descripcion"></v-text-field>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" flat @click="edit">Guardar</v-btn>
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
            <td class="text-xs-right">
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
            </td>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Consultar de nuevo</v-btn>
        </template>
        </v-data-table>
    </div>
</template>

<script>
import axios from 'axios';
import { log } from 'util';
export default {
    name: 'Categoria',
        data: () => ({
            // Date Picker Data
            date: new Date().toISOString().substr(0, 10),
            date2: new Date().toISOString().substr(0, 10),
    // dateFormatted: formatDate(new Date().toISOString().substr(0, 10)),  -> Genera Error y no muestra la Vista
    menu1: false,
    menu2: false,
            filter: false,
            search: '',
            dialog: false,
            dialogEdit: false,
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
                { text: 'Actions', value: 'name', sortable: false, align: 'right', }
            
            ],
            personas: [],
            desserts: [],
            editedIndex: -1,
            descripcion: '',
            itemEdit: [],
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
    computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
    watch: {
        dialog (val) {
        val || this.close()
        },
        date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
    date2 (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
},

    created () {
        this.initialize()
    },

    methods: {
        initialize () {
            this.desserts = [];
            this.getPersonas();
            axios.get(`${this.$api}/reportes`)
            .then(res=>{
                this.desserts = res.data;
                console.log(res.data);
            })
            .catch(err=>{
                alert('Hubo un error, contacte al CGTI')
            });
        },
        getPersonas(){
            this.personas = [];
            axios.get(`${this.$api}/personas`)
            .then(res=>{
                this.personas = res.data;
                
            })
            .catch(err=>{
                alert('Hubo un error, contacte al CGTI1')
            });
        },
        editItem (item) {
            console.log("Get Item");
            this.itemEdit = item;
            // this.dialogEdit = true
        },

        deleteItem (item) {
            console.log(item.id);
            if(confirm(`Seguro que desea eliminar ${item.descripcion}`)){
                axios.delete(`${this.$api}/reportes/${item.id}`)
                .then(res=>{
                    let index = this.desserts.indexOf(res.data);
                    this.desserts.splice(index, 1);
                })
                .catch(err=>{
                    alert('Hubo un error, contacte al CGTI')
                });
            }
        },

        close () {
            this.dialog = false;
            this.dialogEdit = false;
        },
        edit(){
            console.log(this.itemEdit);
            axios.put(`${this.$api}/reportes/${this.itemEdit.id}`,{
                idPersonaReservacion: this.itemEdit.idPersonaReservacion,
                descripcion: this.itemEdit.descripcion
            })
            .then(res=>{
                this.dialogEdit = false;
            })
            .catch(err=>{
                alert('Hubo un error, contacte al CGTI')                
            });
        },
        save () {  
            axios.post(`${this.$api}/reportes`,{
                descripcion : this.descripcion
            })
            .then(res=>{
                this.desserts.push(res.data);
                this.descripcion = '';
            })
            .catch(err=>{
                alert('Hubo un error, contacte al CGTI')
            });
            this.close()
        },
        formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
