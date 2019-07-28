<template>
  <div>
    <v-toolbar flat color="#212121">
      <v-toolbar-title>Cantidad de personas en determinada sala</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>

      <v-btn color="primary" dark class="mb-2" @click="filter = true">Filtrar por fecha</v-btn>
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
        <td class="text-xs-left">{{ props.item.Sala }}</td>
        <td class>{{ props.item.CantidadPersonas }}</td>
        <td
          class="text-xs-right"
        >{{ fechaCompleta(props.item.Year, props.item.Month, props.item.Day ) }}</td>
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
    <v-btn color="primary" dark class="mb-2" @click="imprimir">Imprimir cantidad de salas reservadas</v-btn>
    <v-btn color="primary" dark class="mb-2" @click="reestablecer">Reestablecer</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { log } from "util";
export default {
  name: "ReporteSalas",
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
        text: "Sala",
        align: "left",
        value: "Sala"
      },
      {
        text: "Cantidad de Personas",
        align: "center",
        value: "CantidadPersonas",
        sortable: true
      },
      { text: "Fecha", value: "fechaCompleta", align: "right", sortable: true }
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
        .get(`${this.$api}/reportes/salas`)
        .then(res => {
          this.desserts = res.data;
          console.log(res.data);
        })
        .catch(err => {
          alert("Hubo un error, contacte al CGTI");
        });
    },
    fechaCompleta(año, mes, dia) {
      return `${año}-${mes}-${dia}`;
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
        .post(`${this.$api}/reportes/salas/fecha`, {
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
      let MP = 13;
      let MaxP = 0;
      let xy = 0;
      let mesX = [];

      let T1_1 = [];
      let T1_2 = [];
      let T1_3 = [];

      let T3_1 = [];
      let T3_2 = [];
      let T3_3 = [];

      let TH_1 = [];
      let TH_2 = [];

      let mxx1 = [];
      let mxx3 = [];
      let mxxH = [];

      let finalx1 = [];
      let finalx3 = [];
      let finalxH = [];

      this.desserts.forEach(elem => {
        if (!mesX.includes(elem.Month)) {
          mesX.push(elem.Month);
        }
        if (MP > elem.Month) MP = elem.Month;
        if (MaxP < elem.Month) MaxP = elem.Month;
      });
      mesX.sort();

      for (MP; MP <= MaxP; MP++) {
        for (xy = 0; xy < 36; xy++) {
          T1_1[xy] = "0";
          T1_2[xy] = "0";
          T1_3[xy] = "0";
          T3_1[xy] = "0";
          T3_2[xy] = "0";
          T3_3[xy] = "0";
          TH_1[xy] = "0";
          TH_2[xy] = "0";
        }
        console.log("inside For loop:" + MP);
        this.desserts.forEach(elem => {
          //para saber en que piso va la sala
          if (elem.Month == MP) {
            switch (elem.Sala_id_piso) {
              case 1:
                if (
                  "07:00:00" < elem.HoraInicioReserva &&
                  elem.HoraInicioReserva <= "12:00:00"
                ) {
                  T1_1[elem.Day - 1] = elem.CantidadPersonas;
                }
                if (
                  "12:00:00" < elem.HoraInicioReserva &&
                  elem.HoraInicioReserva <= "16:00:00"
                ) {
                  T1_2[elem.Day - 1] = elem.CantidadPersonas;
                }
                if (
                  "16:00:00" < elem.HoraInicioReserva &&
                  elem.HoraInicioReserva <= "20:00:00"
                ) {
                  T1_3[elem.Day - 1] = elem.CantidadPersonas;
                }
                break;

              case 2:
                if (
                  "07:00:00" < elem.HoraInicioReserva &&
                  elem.HoraInicioReserva <= "12:00:00"
                ) {
                  T3_1[elem.Day - 1] = elem.CantidadPersonas;
                }
                if (
                  "12:00:00" < elem.HoraInicioReserva &&
                  elem.HoraInicioReserva <= "16:00:00"
                ) {
                  T3_2[elem.Day - 1] = elem.CantidadPersonas;
                }
                if (
                  "16:00:00" < elem.HoraInicioReserva &&
                  elem.HoraInicioReserva <= "20:00:00"
                ) {
                  T3_3[elem.Day - 1] = elem.CantidadPersonas;
                }
                break;

              case 3:
                if (
                  "08:00:00" < elem.HoraInicioReserva &&
                  elem.HoraInicioReserva <= "11:00:00"
                ) {
                  TH_1[elem.Day - 1] = elem.CantidadPersonas;
                }
                if (
                  "12:00:00" < elem.HoraInicioReserva &&
                  elem.HoraInicioReserva <= "16:00:00"
                ) {
                  TH_2[elem.Day - 1] = elem.CantidadPersonas;
                }
            }
          }
        }); //final ForEach
        mxx1.push(T1_1);

        mxx1.push(T1_2);

        mxx1.push(T1_3);

        mxx3.push(T3_1);

        mxx3.push(T3_2);

        mxx3.push(T3_3);

        mxxH.push(TH_1);

        mxxH.push(TH_2);

        finalx1.push(mxx1);
        finalx3.push(mxx3);
        finalxH.push(mxxH);

        mxx1 = [];
        mxx3 = [];
        mxxH = [];
      } //Final For
      console.log(finalx1);
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      // este el libro de trabajo
      let workbook = XLSX.utils.book_new();

      //Auxiliares y contadores
      let aux = 0,
        i = 0,
        j = 0,
        cont = 0,
        contD = 0;
      let totalD = 0; //Total de usuarios en un mes
      let mes = mesX;

      //variable tipo array de entero, contiene los meses
      let meses = mes;

      //Variable que guarda la cantidad de meses
      let x = meses.length;

      //Variable tipo arrays of arrrays of arrays de int,
      //contiene los usuarios de un dia de un turno de un mes(Mes x Turno X dia)
      /* let cantDiasT1 = diasT1; //Piso 1
      let cantDiasT2 = diasT2; //Piso 3
      let cantDiasT3 = diasT3; //Hemeroteca*/

      let cantDiasT1 = finalx1;
      let cantDiasT2 = finalx3;
      let cantDiasT3 = finalxH;

      //Celdas de la hoja de calculo
      let ws_data = [];

      //Inicializar las celdas a usar
      for (i = 0; i < 34 * x; i++) {
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
          "",
          "",
          "",
          ""
        ];
      }

      //Crean las hojas de calculo de los 3 pisos
      let piso1 = XLSX.utils.aoa_to_sheet(ws_data);
      let piso3 = XLSX.utils.aoa_to_sheet(ws_data);
      let hemeroteca = XLSX.utils.aoa_to_sheet(ws_data);

      //Variable para combinar las celdas
      let rango = [{ s: { c: 1, r: 5 }, e: { c: 14, r: 5 } }];
      let rangoAux; //Auxiliar para meter nuevos rangos en rango

      //Array con palabras usadas
      let text = [
        "CANTIDAD DE USUARIOS SALAS DE ESTUDIOS",
        "TURNO",
        "1er turno",
        "2do turno",
        "3er turno",
        "RESPONSABLE",
        "FECHA",
        "LUN",
        "MART",
        "MIER",
        "JUEV",
        "VIER",
        "SAB",
        "CANT",
        "TOTAL"
      ];

      //Array con los nombres de los meses
      let mesesN = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ];

      //Llenar la hoja de excel del piso 1
      piso1["B" + 6] = { t: "s", v: text[0] }; //Escribir titulo
      for (i = 0; i < x; i++) {
        let a = cantDiasT1[i][0]; //Piso1
        totalD = 0;
        aux = 7;

        //Escribir texto puntual
        piso1["B" + (8 + 27 * i)] = { t: "s", v: text[1] };
        piso1["B" + (10 + 27 * i)] = { t: "s", v: text[2] };
        piso1["B" + (17 + 27 * i)] = { t: "s", v: text[3] };
        piso1["B" + (24 + 27 * i)] = { t: "s", v: text[4] };
        piso1["B" + (31 + 27 * i)] = { t: "s", v: text[14] };
        piso1["C" + (8 + 27 * i)] = { t: "s", v: text[5] };
        piso1["D" + (8 + 27 * i)] = { t: "s", v: text[6] };
        piso1["E" + (8 + 27 * i)] = { t: "s", v: mesesN[meses[i] - 1] };
        piso1["E" + (9 + 27 * i)] = { t: "s", v: text[13] };
        piso1["F" + (9 + 27 * i)] = { t: "s", v: text[6] };
        piso1["G" + (9 + 27 * i)] = { t: "s", v: text[13] };
        piso1["H" + (9 + 27 * i)] = { t: "s", v: text[6] };
        piso1["I" + (9 + 27 * i)] = { t: "s", v: text[13] };
        piso1["J" + (9 + 27 * i)] = { t: "s", v: text[6] };
        piso1["K" + (9 + 27 * i)] = { t: "s", v: text[13] };
        piso1["L" + (9 + 27 * i)] = { t: "s", v: text[6] };
        piso1["M" + (9 + 27 * i)] = { t: "s", v: text[13] };
        piso1["N" + (9 + 27 * i)] = { t: "s", v: text[6] };
        piso1["O" + (9 + 27 * i)] = { t: "s", v: text[13] };

        //Escribir dias del mes y la cantidad de usuarios
        for (j = 10; j < 30; j++) {
          if (j == 16) {
            j++;
          }
          if (j == 23) {
            j++;
          }

          //Dias de la semana
          piso1["D" + (j + 27 * i)] = { t: "s", v: text[aux] };
          piso1["F" + (j + 27 * i)] = { t: "s", v: text[aux] };
          piso1["H" + (j + 27 * i)] = { t: "s", v: text[aux] };
          piso1["J" + (j + 27 * i)] = { t: "s", v: text[aux] };
          piso1["L" + (j + 27 * i)] = { t: "s", v: text[aux] };
          piso1["N" + (j + 27 * i)] = { t: "s", v: text[aux] };

          //cantidad de usuarios en un dia
          piso1["E" + (j + 27 * i)] = { t: "n", v: a[0 + cont] };
          piso1["G" + (j + 27 * i)] = { t: "n", v: a[6 + cont] };
          piso1["I" + (j + 27 * i)] = { t: "n", v: a[12 + cont] };
          piso1["K" + (j + 27 * i)] = { t: "n", v: a[18 + cont] };
          piso1["M" + (j + 27 * i)] = { t: "n", v: a[24 + cont] };
          piso1["O" + (j + 27 * i)] = { t: "n", v: a[30 + cont] };

          //Sumatoria de los usuarios
          totalD =
            totalD +
            a[0 + cont] +
            a[6 + cont] +
            a[12 + cont] +
            a[18 + cont] +
            a[24 + cont] +
            a[30 + cont];

          if (aux < 12) {
            aux++;
          } else {
            aux = 7;
          }

          if (cont < 5) {
            cont++;
          } else {
            cont = 0;
            if (contD < 2) {
              contD++;
            } else {
              contD = 0;
            }
            a = cantDiasT1[i][contD];
          }
        }

        //Total de usuarios ese mes
        piso1["C" + (31 + 27 * i)] = { t: "n", v: totalD };

        //combinar celdas, 's' es la celda inicial y 'e' es la celda final
        //'c' es la columna y 'r' es la fila. (A1 esta en la posicion '0,0', es decir, c:0 r:0)
        rangoAux = [
          { s: { c: 1, r: 6 + 27 * i }, e: { c: 14, r: 6 + 27 * i } },
          { s: { c: 1, r: 15 + 27 * i }, e: { c: 14, r: 15 + 27 * i } },
          { s: { c: 1, r: 22 + 27 * i }, e: { c: 14, r: 22 + 27 * i } },
          { s: { c: 1, r: 29 + 27 * i }, e: { c: 14, r: 29 + 27 * i } },
          { s: { c: 1, r: 7 + 27 * i }, e: { c: 1, r: 8 + 27 * i } },
          { s: { c: 1, r: 9 + 27 * i }, e: { c: 1, r: 14 + 27 * i } },
          { s: { c: 1, r: 16 + 27 * i }, e: { c: 1, r: 21 + 27 * i } },
          { s: { c: 1, r: 23 + 27 * i }, e: { c: 1, r: 28 + 27 * i } },
          { s: { c: 2, r: 7 + 27 * i }, e: { c: 2, r: 8 + 27 * i } },
          { s: { c: 2, r: 9 + 27 * i }, e: { c: 2, r: 14 + 27 * i } },
          { s: { c: 2, r: 16 + 27 * i }, e: { c: 2, r: 21 + 27 * i } },
          { s: { c: 2, r: 23 + 27 * i }, e: { c: 2, r: 28 + 27 * i } },
          { s: { c: 2, r: 30 + 27 * i }, e: { c: 14, r: 30 + 27 * i } },
          { s: { c: 3, r: 7 + 27 * i }, e: { c: 3, r: 8 + 27 * i } },
          { s: { c: 4, r: 7 + 27 * i }, e: { c: 14, r: 7 + 27 * i } }
        ];
        rango = rango.concat(rangoAux);
        piso1["!merges"] = rango; //"!merges" asigna que celdas se combinan es esa hoja
      }

      //Llenar la hoja de excel del piso 3
      cont = 0;
      contD = 0;
      rango = [{ s: { c: 1, r: 5 }, e: { c: 14, r: 5 } }];
      piso3["B" + 6] = { t: "s", v: text[0] };
      for (i = 0; i < x; i++) {
        let b = cantDiasT2[i][0]; //piso 3
        totalD = 0;
        aux = 7;

        piso3["B" + (8 + 27 * i)] = { t: "s", v: text[1] };
        piso3["B" + (10 + 27 * i)] = { t: "s", v: text[2] };
        piso3["B" + (17 + 27 * i)] = { t: "s", v: text[3] };
        piso3["B" + (24 + 27 * i)] = { t: "s", v: text[4] };
        piso3["B" + (31 + 27 * i)] = { t: "s", v: text[14] };
        piso3["C" + (8 + 27 * i)] = { t: "s", v: text[5] };
        piso3["D" + (8 + 27 * i)] = { t: "s", v: text[6] };
        piso3["E" + (8 + 27 * i)] = { t: "s", v: mesesN[meses[i] - 1] };
        piso3["E" + (9 + 27 * i)] = { t: "s", v: text[13] };
        piso3["F" + (9 + 27 * i)] = { t: "s", v: text[6] };
        piso3["G" + (9 + 27 * i)] = { t: "s", v: text[13] };
        piso3["H" + (9 + 27 * i)] = { t: "s", v: text[6] };
        piso3["I" + (9 + 27 * i)] = { t: "s", v: text[13] };
        piso3["J" + (9 + 27 * i)] = { t: "s", v: text[6] };
        piso3["K" + (9 + 27 * i)] = { t: "s", v: text[13] };
        piso3["L" + (9 + 27 * i)] = { t: "s", v: text[6] };
        piso3["M" + (9 + 27 * i)] = { t: "s", v: text[13] };
        piso3["N" + (9 + 27 * i)] = { t: "s", v: text[6] };
        piso3["O" + (9 + 27 * i)] = { t: "s", v: text[13] };

        for (j = 10; j < 30; j++) {
          if (j == 16) {
            j++;
          }
          if (j == 23) {
            j++;
          }

          //Dias de la semana
          piso3["D" + (j + 27 * i)] = { t: "s", v: text[aux] };
          piso3["F" + (j + 27 * i)] = { t: "s", v: text[aux] };
          piso3["H" + (j + 27 * i)] = { t: "s", v: text[aux] };
          piso3["J" + (j + 27 * i)] = { t: "s", v: text[aux] };
          piso3["L" + (j + 27 * i)] = { t: "s", v: text[aux] };
          piso3["N" + (j + 27 * i)] = { t: "s", v: text[aux] };

          //cantidad de usuarios en un dia
          piso3["E" + (j + 27 * i)] = { t: "n", v: b[0 + cont] };
          piso3["G" + (j + 27 * i)] = { t: "n", v: b[6 + cont] };
          piso3["I" + (j + 27 * i)] = { t: "n", v: b[12 + cont] };
          piso3["K" + (j + 27 * i)] = { t: "n", v: b[18 + cont] };
          piso3["M" + (j + 27 * i)] = { t: "n", v: b[24 + cont] };
          piso3["O" + (j + 27 * i)] = { t: "n", v: b[24 + cont] };

          //Sumatoria de los usuarios
          totalD =
            totalD +
            b[0 + cont] +
            b[6 + cont] +
            b[12 + cont] +
            b[18 + cont] +
            b[24 + cont] +
            b[30 + cont];

          if (aux < 12) {
            aux++;
          } else {
            aux = 7;
          }

          if (cont < 5) {
            cont++;
          } else {
            cont = 0;
            if (contD < 2) {
              contD++;
            } else {
              contD = 0;
            }
            b = cantDiasT2[i][contD];
          }
        }

        //Total de usuarios ese mes
        piso3["C" + (31 + 27 * i)] = { t: "n", v: totalD };

        //combinar celdas
        rangoAux = [
          { s: { c: 1, r: 6 + 27 * i }, e: { c: 14, r: 6 + 27 * i } },
          { s: { c: 1, r: 15 + 27 * i }, e: { c: 14, r: 15 + 27 * i } },
          { s: { c: 1, r: 22 + 27 * i }, e: { c: 14, r: 22 + 27 * i } },
          { s: { c: 1, r: 29 + 27 * i }, e: { c: 14, r: 29 + 27 * i } },
          { s: { c: 1, r: 7 + 27 * i }, e: { c: 1, r: 8 + 27 * i } },
          { s: { c: 1, r: 9 + 27 * i }, e: { c: 1, r: 14 + 27 * i } },
          { s: { c: 1, r: 16 + 27 * i }, e: { c: 1, r: 21 + 27 * i } },
          { s: { c: 1, r: 23 + 27 * i }, e: { c: 1, r: 28 + 27 * i } },
          { s: { c: 2, r: 7 + 27 * i }, e: { c: 2, r: 8 + 27 * i } },
          { s: { c: 2, r: 9 + 27 * i }, e: { c: 2, r: 14 + 27 * i } },
          { s: { c: 2, r: 16 + 27 * i }, e: { c: 2, r: 21 + 27 * i } },
          { s: { c: 2, r: 23 + 27 * i }, e: { c: 2, r: 28 + 27 * i } },
          { s: { c: 2, r: 30 + 27 * i }, e: { c: 14, r: 30 + 27 * i } },
          { s: { c: 3, r: 7 + 27 * i }, e: { c: 3, r: 8 + 27 * i } },
          { s: { c: 4, r: 7 + 27 * i }, e: { c: 14, r: 7 + 27 * i } }
        ];
        rango = rango.concat(rangoAux);
        piso3["!merges"] = rango;
      }

      //Llenar la hoja de excel del hemeroteca
      cont = 0;
      contD = 0;
      rango = [{ s: { c: 1, r: 5 }, e: { c: 14, r: 5 } }];
      hemeroteca["B" + 6] = { t: "s", v: text[0] };
      for (i = 0; i < x; i++) {
        let c = cantDiasT3[i][0];
        totalD = 0;
        aux = 7;

        hemeroteca["B" + (8 + 20 * i)] = { t: "s", v: text[1] };
        hemeroteca["B" + (10 + 20 * i)] = { t: "s", v: text[2] };
        hemeroteca["B" + (17 + 20 * i)] = { t: "s", v: text[3] };
        hemeroteca["B" + (24 + 20 * i)] = { t: "s", v: text[14] };
        hemeroteca["C" + (8 + 20 * i)] = { t: "s", v: text[5] };
        hemeroteca["D" + (8 + 20 * i)] = { t: "s", v: text[6] };
        hemeroteca["E" + (8 + 20 * i)] = { t: "s", v: mesesN[meses[i] - 1] };
        hemeroteca["E" + (9 + 20 * i)] = { t: "s", v: text[13] };
        hemeroteca["F" + (9 + 20 * i)] = { t: "s", v: text[6] };
        hemeroteca["G" + (9 + 20 * i)] = { t: "s", v: text[13] };
        hemeroteca["H" + (9 + 20 * i)] = { t: "s", v: text[6] };
        hemeroteca["I" + (9 + 20 * i)] = { t: "s", v: text[13] };
        hemeroteca["J" + (9 + 20 * i)] = { t: "s", v: text[6] };
        hemeroteca["K" + (9 + 20 * i)] = { t: "s", v: text[13] };
        hemeroteca["L" + (9 + 20 * i)] = { t: "s", v: text[6] };
        hemeroteca["M" + (9 + 20 * i)] = { t: "s", v: text[13] };
        hemeroteca["N" + (9 + 20 * i)] = { t: "s", v: text[6] };
        hemeroteca["O" + (9 + 20 * i)] = { t: "s", v: text[13] };

        for (j = 10; j < 23; j++) {
          if (j == 16) {
            j++;
          }

          //Dias de la semana
          hemeroteca["D" + (j + 20 * i)] = { t: "s", v: text[aux] };
          hemeroteca["F" + (j + 20 * i)] = { t: "s", v: text[aux] };
          hemeroteca["H" + (j + 20 * i)] = { t: "s", v: text[aux] };
          hemeroteca["J" + (j + 20 * i)] = { t: "s", v: text[aux] };
          hemeroteca["L" + (j + 20 * i)] = { t: "s", v: text[aux] };
          hemeroteca["N" + (j + 20 * i)] = { t: "s", v: text[aux] };

          //cantidad de usuarios en un dia
          hemeroteca["E" + (j + 20 * i)] = { t: "n", v: c[0 + cont] };
          hemeroteca["G" + (j + 20 * i)] = { t: "n", v: c[6 + cont] };
          hemeroteca["I" + (j + 20 * i)] = { t: "n", v: c[12 + cont] };
          hemeroteca["K" + (j + 20 * i)] = { t: "n", v: c[18 + cont] };
          hemeroteca["M" + (j + 20 * i)] = { t: "n", v: c[24 + cont] };
          hemeroteca["O" + (j + 20 * i)] = { t: "n", v: c[30 + cont] };

          //Sumatoria de los dias
          totalD =
            totalD +
            c[0 + cont] +
            c[6 + cont] +
            c[12 + cont] +
            c[18 + cont] +
            c[24 + cont] +
            c[30 + cont];

          if (aux < 12) {
            aux++;
          } else {
            aux = 7;
          }

          if (cont < 5) {
            cont++;
          } else {
            cont = 0;
            if (contD < 1) {
              contD++;
            } else {
              contD = 0;
            }
            c = cantDiasT3[i][contD];
          }
        }

        //Total de usuarios ese mes
        hemeroteca["C" + (24 + 20 * i)] = { t: "n", v: totalD };

        //combinar celdas
        rangoAux = [
          { s: { c: 1, r: 6 + 20 * i }, e: { c: 14, r: 6 + 20 * i } },
          { s: { c: 1, r: 15 + 20 * i }, e: { c: 14, r: 15 + 20 * i } },
          { s: { c: 1, r: 7 + 20 * i }, e: { c: 1, r: 8 + 20 * i } },
          { s: { c: 1, r: 9 + 20 * i }, e: { c: 1, r: 14 + 20 * i } },
          { s: { c: 1, r: 16 + 20 * i }, e: { c: 1, r: 21 + 20 * i } },
          { s: { c: 1, r: 22 + 20 * i }, e: { c: 14, r: 22 + 20 * i } },
          { s: { c: 2, r: 7 + 20 * i }, e: { c: 2, r: 8 + 20 * i } },
          { s: { c: 2, r: 9 + 20 * i }, e: { c: 2, r: 14 + 20 * i } },
          { s: { c: 2, r: 16 + 20 * i }, e: { c: 2, r: 21 + 20 * i } },
          { s: { c: 2, r: 23 + 20 * i }, e: { c: 14, r: 23 + 20 * i } },
          { s: { c: 3, r: 7 + 20 * i }, e: { c: 3, r: 8 + 20 * i } },
          { s: { c: 4, r: 7 + 20 * i }, e: { c: 14, r: 7 + 20 * i } }
        ];
        rango = rango.concat(rangoAux);
        hemeroteca["!merges"] = rango;
      }

      workbook.SheetNames.push("Piso1");
      workbook.SheetNames.push("Piso3");
      workbook.SheetNames.push("Hemeroteca");
      workbook.Sheets["Piso1"] = piso1;
      workbook.Sheets["Piso3"] = piso3;
      workbook.Sheets["Hemeroteca"] = hemeroteca;

      XLSX.writeFile(workbook, "UsuariosDeLaSalaDeEstudio.xls");
      //-----------------------------------------------------------------------------------------------------------------------------------------------
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
