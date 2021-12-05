<template>
    <v-main class="body">
        <div>
            <v-app-bar app fixed class="blue lighten-4">
                <v-btn to="/home">Hotel Apalah</v-btn>
                <v-spacer></v-spacer>

                <v-btn class="mark" to="/home">HOME</v-btn>
                <v-btn class="mark" to="/listkamar">PEMESANAN</v-btn>
                <v-btn class="mark" to="/profile">PROFILE</v-btn>
                <v-btn class="mark" to="/aboutus">ABOUT US</v-btn>

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