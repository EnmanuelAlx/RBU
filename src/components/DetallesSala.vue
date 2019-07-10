<template>
  <div>
    <v-container text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-card color="#135854">
            <v-card-text>Detalle de la sala: #{{sala.id}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card color="#135854">
            <v-card-text>Tiempo restante: Que coño se yo</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card color="#135854">
            <v-card-text>Nombre</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card color="#135854">
            <v-card-text>Cedula</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card color="#135854">
            <v-card-text>Carrera</v-card-text>
          </v-card>
        </v-flex>

        <template v-for="estudiante in sala.reservacion">
          <v-flex v-bind:key="estudiante.nombre" xs4>
            <v-card>
              <v-card-text>
                <v-icon small>star</v-icon>
                {{estudiante.nombre}}
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 v-bind:key="estudiante.cedula">
            <v-card>
              <v-card-text>{{estudiante.cedula}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 v-bind:key="estudiante.carrera">
            <v-card>
              <v-card-text>{{estudiante.carrera}}</v-card-text>
            </v-card>
          </v-flex>
        </template>

        <v-flex xs6>
          <v-card color="#135854">
            <v-card-text>Registrado por:</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card color="#135854">
            <v-card-text>{{sala.encargado}}</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 align-end>
          <v-btn v-on:click="boton('añadir')" color="success">Añadir</v-btn>
          <v-btn v-on:click="boton('terminar')" color="error">Terminar</v-btn>
          <v-btn v-on:click="boton('extender')" color="warning">Extender</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: false
  }),
  props: {
    sala: Object
  }
};
</script>