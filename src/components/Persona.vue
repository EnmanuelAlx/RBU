<template>
    <div>
        <v-toolbar flat color="#212121">
            <v-toolbar-title>Personas</v-toolbar-title>
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
                <v-btn color="primary" dark class="mb-2" v-on="on">Nueva persona</v-btn>
                </template>
                <v-card>
                <v-card-title>
                    <span class="headline">Nueva persona</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field v-model="persona.nombres" outline label="Nombres"/>
                            <v-text-field v-model="persona.apellidos" outline label="Apellidos"/>
                            <v-select
                            :items="categorias"
                            label="Categoria"
                            outline
                            item-text="descripcion"
                            item-value="id"
                            v-model="persona.idCategoria"
                            ></v-select>
                            <v-select
                            :items="ofertas"
                            label="Tipos de Oferta"
                            outline
                            item-text="descripcion"
                            item-value="id"
                            v-model="persona.idOfertaAcademica"
                            />
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>

        <v-dialog v-model="dialogEdit" max-width="500px">
            <v-card>
            <v-card-title>
                <span class="headline">Editar persona</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field v-model="personaEdit.nombres" outline label="Nombres"/>
                            <v-text-field v-model="personaEdit.apellidos" outline label="Apellidos"/>
                            <v-select
                            :items="categorias"
                            label="Categoria"
                            outline
                            item-text="descripcion"
                            item-value="id"
                            v-model="personaEdit.idCategoria"
                            ></v-select>
                            <v-select
                            :items="ofertas"
                            label="Tipos de Oferta"
                            outline
                            item-text="descripcion"
                            item-value="id"
                            v-model="personaEdit.idOfertaAcademica"
                            />
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

        <v-dialog v-model="dialogSancion" max-width="500px">
            <v-card>
            <v-card-title>
                <span class="headline">Sancionar a {{ objSancion.persona.nombres }} {{ objSancion.persona.apellidos }}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-textarea v-model="objSancion.descripcion" outline label="Nota"/>
                        <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                        >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            v-model="objSancion.fechaInicio"
                            label="Fecha de Inicio"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="objSancion.fechaInicio" @input="menu = false" locale="es"></v-date-picker>
                        </v-menu>
                        <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                v-model="objSancion.fechaFin"
                                label="Fecha Final"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="objSancion.fechaFin" locale="es" @input="menu2 = false"></v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" flat @click="sancionar">Sancionar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>



        <v-data-table
        :headers="headers"
        :items="personas"
        :search="search"
        class="elevation-1"
        >
        <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.nombres }}</td>
            <td class="text-xs-left">{{ props.item.apellidos }}</td>
            <td class="text-xs-left">{{ props.item.cedula }}</td>
            <td class="text-xs-left">{{ props.item.idCategoria.descripcion }}</td>
            <td class="text-xs-left">{{ props.item.idOfertaAcademica.descripcion }}</td>
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
            <v-icon
                small
                @click="sancion(props.item)"
            >
                block
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
export default {
    name: 'Personas',
        data: () => ({
            search: '',
            dialog: false,
            dialogEdit: false,
            headers: [
                {
                    text: 'Nombres',
                    align: 'left',
                    value: 'nombres'
                },
                { text: 'Apellidos', value: 'apellidos', sortable: true, },
                { text: 'Cedula', value: 'cedula', sortable: true, },
                { text: 'Categoria', value: 'idOfertaAcademica.descripcion', sortable: true, },
                { text: 'Oferta Academica', value: 'idCategoria.descripcion', sortable: true, },
                { text: 'Actions', value: 'actions', sortable: false, align: 'right', }
            
            ],
            ofertas: [],
            personas: [],
            editedIndex: -1,
            descripcion: '',
            id_tipo: '',
            itemEdit: {},
            defaultItem: {
                descripcion: '',
            },
            persona:{
                nombres: '',
                apellidos: '',
                idOfertaAcademica: null,
                idCategoria: null
            },
            personaEdit:{
                nombres: '',
                apellidos: '',
                idOfertaAcademica: null,
                idCategoria: null
            },
            objSancion:{
                persona:{},
                fechaInicio: new Date().toISOString().substr(0, 10),
                fechaFin: new Date().toISOString().substr(0, 10),
                descripcion: '',
            },
            menu: false,
            menu2:false,
            dialogSancion: false,
            categorias:[]
            
    }),
    watch: {
        dialog (val) {
        val || this.close()
        }
    },

    created () {
        this.initialize()
    },

    methods: {
        initialize () {
            this.getPersonas();
            this.getOfertasAcademicas();
            this.getCategorias();
        },
        getOfertasAcademicas(){
            axios.get(`${this.$api}/ofertasAcademicas`)
            .then(res=>{
                this.ofertas = res.data;
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
        getCategorias(){
            this.personas = [];
            axios.get(`${this.$api}/categorias`)
            .then(res=>{
                this.categorias = res.data;
            })
            .catch(err=>{
                alert('Hubo un error, contacte al CGTI1')
            });
        },
        editItem (item) {
            this.personaEdit = item
            this.dialogEdit = true
        },

        deleteItem (item) {
            if(confirm(`Seguro que desea eliminar ${item.nombres} ${item.apellidos}`)){
                axios.delete(`${this.$api}/persona/${item.id}`)
                .then(res=>{
                    let index = this.personas.indexOf(res.data);
                    this.personas.splice(index, 1);
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
            axios.put(`${this.$api}/persona/${this.personaEdit.id}`,{
                nombres: this.personaEdit.nombres,
                apellidos: this.personaEdit.apellidos,
                idOfertaAcademica: this.personaEdit.idOfertaAcademica,
                idCategoria: this.personaEdit.idCategoria
            })
            .then(res=>{
                location.reload()                
            })
            .catch(err=>{
                alert('Hubo un error, contacte al CGTI')                
            });
        },
        save () {  
            axios.post(`${this.$api}/persona`,{
                nombres : this.persona.nombres,
                apellidos: this.persona.apellidos,
                idOfertaAcademica: this.persona.idOfertaAcademica,
                idCategoria: this.persona.idCategoria
            })
            .then(res=>{
                location.reload()
            })
            .catch(err=>{
                alert('Hubo un error, contacte al CGTI')
            });
            this.close()
        },
        sancion(item){
            this.dialogSancion = true;
            this.objSancion.persona = item;
        },
        sancionar(){
            this.objSancion.idPersonaReservacion = this.objSancion.persona.id;
            let sancion = this.objSancion
            axios.post(`${this.$api}/sancionar`, {
                sancion,
            })
            .then(res=>{
                console.log(res.data);
                this.dialogSancion = false;
            })
            .catch(err=>{
                alert('Hubo un error al sancionar, contacte al CGTI')
            });
        }
    }

}
</script>

<style scoped>

</style>
