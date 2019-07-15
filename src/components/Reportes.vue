<template>
  <div>
    <v-toolbar flat color="#212121">
      <v-toolbar-title>Sanciones Activas</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>

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
          <v-spacer />
          <v-btn color="success" @click="filtrar">Filtrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
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
        </td>-->
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
import axios from "axios";
import { log } from "util";
export default {
  name: "ReporteSanciones",
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    date2: "",
    menu1: false,
    menu2: false,
    filter: false,
    search: "",
    dialog: false,
    headers: [
      {
        text: "Nombres",
        align: "left",
        value: "idPersonaReservacion.nombres"
      },
      {
        text: "Apellidos",
        value: "idPersonaReservacion.apellidos",
        sortable: true
      },
      { text: "Fecha Inicio", value: "fechaInicio", sortable: true },
      { text: "Fecha Fin", value: "fechaFin", sortable: true },
      { text: "Descripcion", value: "descripcion", sortable: true }
    ],
    desserts: [],
    descripcion: "",
    defaultItem: {
      descripcion: ""
    },
    reportes: {
      nombres: "",
      apellidos: "",
      fechaInicio: null,
      fechaFin: null,
      descripcion: ""
    }
  }),
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [];
      axios
        .get(`${this.$api}/reportes/sanciones`)
        .then(res => {
          this.desserts = res.data;
          console.log(res.data);
        })
        .catch(err => {
          alert("Hubo un error, contacte al CGTI");
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

    close() {
      this.dialog = false;
      this.dialogEdit = false;
    },
    filtrar() {
      let fechaInicio = this.date;
      let fechaFin = this.date2;
      console.log(fechaInicio, fechaFin);
      axios
        .post(`${this.$api}/reportes/sanciones/fecha`, {
          fechaInicio,
          fechaFin
        })
        .then(res => {
          if (res.data.length == 0) {
            alert("No existen sanciones en ese rango de fechas");
            return;
          }
          this.filter = false;
          this.desserts = [];
          this.desserts = res.data;
        })
        .catch(err => {
          alert("Hubo un problema al filtrar, contacte con el CGTI");
        });
    },
    imprimir() {
      let arreglomini = [];
      let reportesA = [];
      let xy;
      this.desserts.forEach(elem => {
        arreglomini.push(elem.idPersonaReservacion.nombres);
        arreglomini.push(elem.idPersonaReservacion.apellidos);
        xy = elem.idPersonaReservacion.cedula;
        xy = String(xy);
        arreglomini.push(xy);
        arreglomini.push(elem.fechaInicio);
        arreglomini.push(elem.fechaFin);
        reportesA.push(arreglomini);
        console.log(arreglomini);
        arreglomini = [];
      });
      console.log("Reportes");
      console.log(reportesA);

      //---------------------------------------------------------------------------------
      // Este es el libro de trabajo
      let sancion = reportesA;
      console.log(sancion);
      let workbook = XLSX.utils.book_new();

      //Auxiliares y contadores
      let aux = 0,
        i = 0,
        j = 0,
        cont = 0,
        contD = 0,
        totalD = 0;

      //Celdas de la hoja de calculo
      let ws_data = [];

      //Cantidad de sancionados y sancionados
      let x = sancion.length;
      //let sancion = sanciones;

      //Inicializar las celdas a usar
      for (i = 0; i < 8 + x; i++) {
        ws_data[i] = [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ];
      }

      //Estas es la hoja de calculo
      let sancionados = XLSX.utils.aoa_to_sheet(ws_data);

      //Array con palabras usadas
      let text = [
        "USUARIOS SANCIONADOS",
        "Nombre",
        "Apellido",
        "C.I.",
        "Inicio",
        "Fin"
      ];

      //Llenar la hoja de excel de los sancionados
      sancionados["B" + 6] = { t: "s", v: text[0] };
      sancionados["B" + 7] = { t: "s", v: text[1] };
      sancionados["C" + 7] = { t: "s", v: text[2] };
      sancionados["D" + 7] = { t: "s", v: text[3] };
      sancionados["E" + 7] = { t: "s", v: text[4] };
      sancionados["F" + 7] = { t: "s", v: text[5] };
      for (i = 0; i < x; i++) {
        //Escribir
        sancionados["B" + (8 + i)] = { t: "s", v: sancion[i][0] };
        sancionados["C" + (8 + i)] = { t: "s", v: sancion[i][1] };
        sancionados["D" + (8 + i)] = { t: "s", v: sancion[i][2] };
        sancionados["E" + (8 + i)] = { t: "s", v: sancion[i][3] };
        sancionados["F" + (8 + i)] = { t: "s", v: sancion[i][4] };
      }

      //combinar celdas
      //Variable para la para combinar las celdas
      let rango = [{ s: { c: 1, r: 5 }, e: { c: 5, r: 5 } }];
      sancionados["!merges"] = rango;

      workbook.SheetNames.push("Sancionados");
      workbook.Sheets["Sancionados"] = sancionados;
      XLSX.writeFile(workbook, "ReporteDeSanciones.xls");
      //---------------------------------------------------------------------------------
    },
    reestablecer() {
      this.initialize();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
