<template>
<div>
            <v-toolbar>
        <v-toolbar-title>Registro de Salas</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Agregar persona</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
  
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.cedula" label="Cédula"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.carrera" label="Carrera"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Agregar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="texto"
        class="elevation-1"
        hide-actions
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.cedula }}</td>
          <td>{{ props.item.carrera }}</td>
          <td class="justify-center layout px-0">
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
        </template>
      </v-data-table>
      <v-container id="dropdownsala" grid-list-xl>
        <v-layout align-center=true>
          <v-flex xs12 sm6>
            <p>Salas disponibles</p>
    
            <v-overflow-btn
              :items="salas"
              label="Salas"
              target="#dropdownsala"
              
            ></v-overflow-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs5 sm5 align-center=true>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
            <v-text-field
              v-model="Beca"
              :rules="nameRules"
              label="Beca de Turno"
              required
              ></v-text-field>
        
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
      <div class="text-xs-center">
        <v-btn color="success" >Procesar</v-btn> 
        <v-btn color="error">Cancelar</v-btn>
      </div>
</div>
</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      dialog: false,
      headers: [
        {
          text: 'Nombre y Apellido',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        { text: 'Cedula', value: 'cedula', sortable: false},
        { text: 'Carrera', value: 'carrera', sortable: false }
      ],
      texto: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        cedula: '',
        carrera: ''
      },
      defaultItem: {
        name: '',
        cedula:'',
        carrera:''
      },

      valid: true,
      Beca: '',
      nameRules: [
        v => !!v || '¡Introduzca un nombre!'
      ],


  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  props: ['salas'],

  methods: {

    editItem (item) {
      this.editedIndex = this.texto.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.texto.indexOf(item)
      confirm('¿Desea eliminar a esta persona?') && this.texto.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.texto[this.editedIndex], this.editedItem)
      } else {
        this.texto.push(this.editedItem)
      }
      this.close()
    }
    
    }

  }
</script>