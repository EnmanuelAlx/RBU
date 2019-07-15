<template>
<div id="app">
    <v-app dark>
        <v-navigation-drawer
        clipped
        fixed
        v-model="drawer"
        app
        class="grey darken-4"
        >
            <v-list dense>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link :to="{name : 'dashboard'}" tag="v-list-tile-title">Reservaciones</router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link :to="{name : 'Persona'}" tag="v-list-tile-title">Persona</router-link>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link :to="{name : 'OfertaAcademica'}" tag="v-list-tile-title">Ofertas Academicas</router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link :to="{name : 'TipoOfertaAcademica'}" tag="v-list-tile-title">Tipos de Ofertaas Academica</router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link :to="{name : 'Salas'}" tag="v-list-tile-title">Salas</router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link :to="{name : 'Categoria'}" tag="v-list-tile-title">Categorias</router-link>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-group
                    prepend-icon="view_column"
                >
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title>Reportes</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                    <v-list-tile>
                        <v-list-tile-action>
                            
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <router-link :to="{name : 'reporteSancion'}" tag="v-list-tile-title">Sanciones</router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <router-link :to="{name : 'reporteSalas'}" tag="v-list-tile-title">Cantidad de personas en salas</router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <router-link :to="{name : 'reporteReservas'}" tag="v-list-tile-title">Cantidad de reservas de una sala</router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Sistema de reservacion para la biblioteca de la UCAB</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <transition
                name="fadeDown"
                mode="out-in"
            >
                <router-view style="animation-duration: 0.2s"></router-view>
            </transition>
        </v-content>
    </v-app>
</div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            drawer: true,
        }
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.v-list__tile__title{
    cursor: pointer;
}
</style>
