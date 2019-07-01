<template>
    <div>
        <v-toolbar flat color="#212121">
            <v-toolbar-title>Tipos de Ofertas Academicas</v-toolbar-title>
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
                <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo tipo de oferta academica</v-btn>
                </template>
                <v-card>
                <v-card-title>
                    <span class="headline">Nuevo tipo de oferta academica</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field v-model="descripcion" label="Descripcion"></v-text-field>
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
                <span class="headline">Editar tipo de oferta academica</span>
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
export default {
    name: 'OfertaAcademica',
        data: () => ({
            search: '',
            dialog: false,
            dialogEdit: false,
            headers: [
                {
                    text: 'Descripcion',
                    align: 'left',
                    value: 'descripcion'
                },
                { text: 'Actions', value: 'name', sortable: false, align: 'right', }
            
            ],
            desserts: [],
            editedIndex: -1,
            descripcion: '',
            itemEdit: {},
            defaultItem: {
                descripcion: '',
            }
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
            this.desserts = [];
            axios.get(`${this.$api}/tipos`)
            .then(res=>{
                this.desserts = res.data;
                console.log(res.data);
            })
            .catch(err=>{
                alert('Hubo un error, contacte al CGTI')
            });
        },

        editItem (item) {
            console.log(item);
            this.itemEdit = item;
            this.dialogEdit = true
        },

        deleteItem (item) {
            console.log(item.id);
            if(confirm(`Seguro que desea eliminar ${item.descripcion}`)){
                axios.delete(`${this.$api}/tipo/${item.id}`)
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
            axios.put(`${this.$api}/tipo/${this.itemEdit.id}`,{
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
            axios.post(`${this.$api}/tipo`,{
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
        }
    }

}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
