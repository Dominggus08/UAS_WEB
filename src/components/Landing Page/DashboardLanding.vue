<template>
    <v-main>
        <div>
            <v-app-bar app fixed class="dark lighten-4">
                <v-btn to="/">Hotel Apalah</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="mark" to="/register">REGISTER</v-btn>
                <v-btn class="mark" to="/userlogin">LOGIN</v-btn>
            </v-app-bar>
        </div>

        <div>
            <v-parallax
                height="1000"
                dark
                src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        class="text-center"
                        cols="12"
                    >
                        <h1 class="text-h4 font-weight-thin mb-4">Vuetify</h1>
                        <h4 class="subheading">Build your application today!</h4>
                    </v-col>
                </v-row>
            </v-parallax>
        </div>
        <div class="fullheight">
            <router-view></router-view>
        </div>
    </v-main>
</template>

<script>
  export default {
    data () {
      return {
        items: [

        ],
      }
    },
  }
</script>
