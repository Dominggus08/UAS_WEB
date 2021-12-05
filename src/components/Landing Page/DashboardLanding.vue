<template>
    <v-main class="body">
        <div>
            <v-app-bar app fixed class="blue lighten-4">
                <v-btn to="/">Hotel Apalah</v-btn>
                <v-spacer></v-spacer>

                <v-btn class="mark" to="/register">REGISTER</v-btn>
                <v-btn class="mark" to="/userlogin">LOGIN</v-btn>

            </v-app-bar>
            <div class="fullheight pa-5">
                <router-view></router-view>
            </div>
        </div>
    </v-main>
</template>