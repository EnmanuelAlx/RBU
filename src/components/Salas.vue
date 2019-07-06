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
		<DetallesSala></DetallesSala>
	</v-dialog>
    <v-layout row wrap>
      <v-flex xs2>
        <v-card flat hover color="success" height="100%" @click="open()"> <!-- @click="open(sala.id)"-->
          <v-card-text>
			<br /> Sala X <!--Sala {{sala.id}}-->
			<br /> --:--:-- <!-- {{tiempoRestante(sala.reserva.inicio)}}-->
			<br />
			<br /> 
          </v-card-text>
        </v-card>
      </v-flex>
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
	openId: -1,
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
	open(id){
		this.openId = id
		this.dialog = true
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
	close () {
      this.dialog = false
    },
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
