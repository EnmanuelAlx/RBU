<template>
  <v-container grid-list-md text-xs-center>
    <v-toolbar flat color="#212121">
      <v-toolbar-title>Salas</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog max-width="850px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Registrar Entrada</v-btn>
        </template>
        <Entrada v-bind:salas="salas"></Entrada>
      </v-dialog>
    </v-toolbar>
    <v-dialog v-model="dialog" max-width="500px">
      <DetallesSala v-bind:sala="salaActual"></DetallesSala>
    </v-dialog>
    <v-layout row wrap>
      <template v-for="sala in salas">
        <v-flex xs2 v-bind:key="sala.id">
          <v-card flat hover v-bind:color="colores[sala.idEstado.id]" height="100%" @click="open(sala)">
            <!-- @click="open(sala)"-->
            <v-card-text>
              <br />Sala {{sala.id}}
              <br />--:--:--
              <br />
              <br />
            </v-card-text>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import Entrada from "./Entrada";
import DetallesSala from "./DetallesSala";
export default {
  name: "OfertaAcademica",
  data: () => ({
    salas: [],
    dialog: false,
    salaActual: {
      id: 1
    },
    colores: {
      0: "success",
      1: "orange",
      2: "blue"
    }
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  components: {
    Entrada,
    DetallesSala
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.getSalas();
    },
    open(sala) {
      this.salaActual = sala;
      this.dialog = true;
    },
    getSalas() {
      this.salas = [];
      axios
        .get(`${this.$api}/salas`)
        .then(res => {
          this.salas = res.data;
          console.log(res.data);
        })
        .catch(err => {
          alert("Hubo un error, contacte al CGTI");
        });
    },
    close() {
      this.salaActual = {
        id: 1
      };
      this.dialog = false;
    }
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
