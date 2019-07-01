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
                        <router-link :to="{name : 'hello'}" tag="v-list-tile-title">Primero</router-link>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link :to="{name : 'OfertaAcademica'}" tag="v-list-tile-title">Ofertaas Academica</router-link>
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
