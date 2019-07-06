import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OfertaAcademica from '@/components/OfertaAcademica'
import Salas from '@/components/Salas'
import TipoOfertaAcademica from '@/components/TipoOfertaAcademica'
import Categoria from '@/components/Categoria'
import Personas from '@/components/Persona'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: HelloWorld
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
    }
  ]
})
