<template>
  <div>
    <v-toolbar flat color="#212121">
      <v-toolbar-title>Salas</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
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
          <v-btn color="primary" dark class="mb-2" v-on="on">Agregar Sala</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Nueva Sala</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="sala.nombre" outline label="Nombre" placeholder="Nombre" />
                  <v-select
                    :items="pisos"
                    label="Piso"
                    outline
                    item-text="descripcion"
                    item-value="id"
                    v-model="sala.idpiso"
                  ></v-select>
                  <v-select
                    :items="tiposSala"
                    label="Tipo de Sala"
                    outline
                    item-text="tipo"
                    item-value="id"
                    v-model="sala.tipo"
                  />
                  <v-text-field
                    name="Capacidad"
                    label="Capacidad"
                    v-model="sala.capacidad"
                  ></v-text-field>
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
          <span class="headline">Editar Sala</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                    name="nombre"
                    label="Nombre"
                    v-model="salaEdit.nombre"
                ></v-text-field>
                <v-select
                  :items="estados"
                  v-model="salaEdit.estado"
                  label="Estado"
                  item-text="descripcion"
                  item-value="id"
                ></v-select>
                <v-select
                  :items="tiposSala"
                  label="Tipo de Sala"
                  outline
                  item-text="tipo"
                  item-value="id"
                  v-model="salaEdit.tipo"
                />
                <v-text-field
                    name="Capacidad"
                    label="Capacidad"
                    v-model="salaEdit.capacidad"
                ></v-text-field>
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

    <v-data-table :headers="headers" :items="salas" :search="search" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.nombre }}</td>
        <td class="text-xs-left">{{ props.item.idPiso.descripcion }}</td>
        <td class="text-xs-left">{{ traducirEstado(props.item.idEstado.descripcion) }}</td>
        <td class="text-xs-left">{{ props.item.idTipo.descripcion }}</td>
        <td class="text-xs-left">{{ props.item.capacidad }}</td>
        <td class="text-xs-right">
          <!-- <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon> -->
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Consultar de nuevo</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Salas",
  data: () => ({
    search: "",
    dialog: false,
    dialogEdit: false,
    headers: [
      {
        text: "Nombre",
        value: "nombre",
        sortable: true
      },
      {
        text: "Piso",
        value: "idPiso.descripcion",
        sortable: true
      },
      {
        text: "Estado",
        value: "idEstado.descripcion",
        sortable: true
      },
      {
        text: "Tipo",
        value: "idTipo.descripcion",
        sortable: true
      },
      {
        text: "Capacidad Maxima",
        value: "capacidad",
        sortable: true
      },
      {
        text: "Acciones",
        value: "actions",
        sortable: false,
        align: "right"
      }
    ],
    ofertas: [],
    salas: [],
    editedIndex: -1,
    descripcion: "",
    id_tipo: "",
    itemEdit: {},
    defaultItem: {
      descripcion: ""
    },
    sala: {
      nombre: "",
      idpiso: null,
      tipo: null,
      capacidad: 0,
    },
    salaEdit: {
      id: null,
      nombre: "",
      idpiso: null,
      tipo: null,
      capacidad: 0
    },
    tiposSala: [
      {
        id: 1,
        tipo: "Normal"
      },
      {
        id: 2,
        tipo: "Profesores"
      },
      {
        id: 3,
        tipo: "Otro"
      }
    ],
    pisos: [
      {
        id: 1,
        descripcion: "Piso 1"
      },
      {
        id: 2,
        descripcion: "Piso 2"
      },
      {
        id: 3,
        descripcion: "Mezanina"
      }
    ],
    estados: [
      {
        id: 1,
        descripcion: 'Disponible'
      },
      {
        id: 2,
        descripcion: 'Ocupado'
      },
    ]
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.getSalas();
    },
    getSalas() {
      this.salas = [];
      axios
        .get(`${this.$api}/salas`)
        .then(res => {
          this.salas = res.data;
        })
        .catch(err => {
          alert("Hubo un error, contacte al CGTI");
        });
    },
    editItem(item) {
      console.log(item)
      this.salaEdit = item;
      this.dialogEdit = true;
    },

    deleteItem(item) {
      if (
        confirm(`Seguro que desea eliminar ${item.id} piso#${item.idpiso}?`)
      ) {
        axios
          .delete(`${this.$api}/salas/${item.id}`)
          .then(res => {
            let index = this.salas.indexOf(res.data);
            this.salas.splice(index, 1);
          })
          .catch(err => {
            alert("Hubo un error, contacte al CGTI");
          });
      }
    },

    close() {
      this.dialog = false;
      this.dialogEdit = false;
    },
    edit() {
      axios
        .put(`${this.$api}/salas/${this.salaEdit.id}`, {
          nombre: this.salaEdit.nombre,
          idEstado: this.salaEdit.estado,
          idTipo: this.salaEdit.tipo,
          capacidad: this.sala.capacidad
        })
        .then(res => {
          location.reload();
        })
        .catch(err => {
          alert("Hubo un error, contacte al CGTI");
        });
    },
    save() {
      axios
        .post(`${this.$api}/sala`, {
          nombre: this.sala.nombre,
          idPiso: this.sala.idpiso,
          idTipo: this.sala.tipo,
          idEstado: 1,
          capacidad: this.sala.capacidad,
        })
        .then(res => {
          location.reload();
        })
        .catch(err => {
          alert("Hubo un error, contacte al CGTI");
        });
      this.close();
    },
    traducirEstado(estado){
      switch (estado) {
        case '1':
          return 'Disponible'
          break;
        case '2':
          return 'Ocupado'
          break;
      
        default:
          return 'Hay algo raro, revise a su medico'
          break;
      }
    }
  }
};
</script>

<style scoped>
</style>
