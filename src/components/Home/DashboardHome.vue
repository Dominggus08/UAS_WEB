<template>
    <v-main class="body">
        <div>
            <v-app-bar app fixed class="blue lighten-4">
                <v-toolbar-title >Hotel Apalah</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn class="mark" plain @click="goBuyTickets()">HOME</v-btn>
                <v-btn class="mark" to="/listkamar" plain @click="goProfileUser()">PEMESANAN</v-btn>
                <v-btn class="mark" plain @click="goProfileUser()">PROFILE</v-btn>
                <v-btn class="mark" plain @click="goProfileUser()">ABOUT US</v-btn>

            </v-app-bar>
            <div class="fullheight pa-5">
                <router-view></router-view>
            </div>
        </div>
    </v-main>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                drawer: true,
                items: [
                    {title: "Kamar", to: "/kamar"},
                    {title: "User", to: "/user"},
                    {title: "Notes", to: "/note"},
                ],
            };
        },
    };
</script>