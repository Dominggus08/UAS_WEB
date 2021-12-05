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

            <!-- <div class="bg"></div> -->
            <div class="fullheight pa-5">
                <router-view></router-view>
            </div>
        </div>
    </v-main>
</template>

<style>
.bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(https://wallpaperaccess.com/full/1624848.jpg);
        background-size: cover;
        transform: scale(1.1);
        filter: brightness(50%); 
    }
</style>