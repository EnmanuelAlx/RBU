import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import OfertaAcademica from '@/components/OfertaAcademica'
import Salas from '@/components/Salas'
import TipoOfertaAcademica from '@/components/TipoOfertaAcademica'
import Categoria from '@/components/Categoria'
import Personas from '@/components/Persona'
import ReporteSancion from '@/components/Reportes'
import ReporteSalas from '@/components/ReporteSalas'
import ReporteReservas from '@/components/ReporteReservas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/oferta-academica',
      name: 'OfertaAcademica',
      component: OfertaAcademica
    },
    {
      path: '/tipo-oferta-academica',
      name: 'TipoOfertaAcademica',
      component: TipoOfertaAcademica
    },
    {
      path: '/categoria',
      name: 'Categoria',
      component: Categoria
    },
    {
      path: '/personas',
      name: 'Persona',
      component: Personas
    },
    {
      path: '/salas',
      name: 'Salas',
      component: Salas
    },
    {
      path: '/reportes-sanciones',
      name: 'reporteSancion',
      component: ReporteSancion
    },
    {
      path: '/reportes-salas',
      name: 'reporteSalas',
      component: ReporteSalas
    },
    {
      path: '/reportes-reservas',
      name: 'reporteReservas',
      component: ReporteReservas
    },
  ]
})
