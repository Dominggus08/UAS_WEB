<template>
    <v-main class="body">
        <div>
            <v-app-bar app fixed class="blue lighten-4">
                <v-toolbar-title >Hotel Apalah</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn class="mark" to="/register" plain @click="goBuyTickets()">REGISTER</v-btn>
                <v-btn class="mark" to="/userlogin" plain @click="goProfileUser()">LOGIN</v-btn>

            </v-app-bar>
            <div class="fullheight pa-5">
                <router-view></router-view>
            </div>
        </div>
    </v-main>
</template>