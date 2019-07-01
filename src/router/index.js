import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OfertaAcademica from '@/components/OfertaAcademica'
import TipoOfertaAcademica from '@/components/TipoOfertaAcademica'

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
    }
  ]
})
