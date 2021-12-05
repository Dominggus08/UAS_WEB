<template>
    <v-card
        class="mx-auto"
        color="blue lighten"
        dark
        max-width="500">
        <v-card-title>
            <v-icon
                large
                left>mdi-account</v-icon>
        <span class="text-h6 font-weight-light">Profile</span>
        </v-card-title>

        <v-card-text class="text-h5 font-weight-bold">
        {{email}}
        </v-card-text>

        <v-card-actions>
        <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
            <v-img
                class="elevation-6"
                alt=""
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title class="mr-15">{{name}}</v-list-item-title>
            </v-list-item-content>

            <v-row
            align="center"
            justify="end"
            >
            <v-btn
                outlined
                color="white"
                class="ma-2">EDIT</v-btn>
            </v-row>
        </v-list-item>
        </v-card-actions>
    </v-card>

        
</template>

<v-card
            class="mx-auto"
            elevation="24"
            max-width="260">
            <v-card-title>{{name}}</v-card-title>
            <v-card-subtitle>{{email}}</v-card-subtitle>
            <v-spacer></v-spacer>
                <v-card-actions>
                    <v-btn @click="editHandler()"
                        color="orange lighten-2"
                        text
                    >Edit</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
    </v-card>

<script>
    export default {
        data() {
            return {
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                selectedId: '',
                form: {
                    date: null,
                    name: null,
                    location: null,
                },
            }

        },
        methods: {
            logout() {
                localStorage.removeItem('token');
                this.$router.push({
                    name: '/',
                });
            },

            editHandler(item) {
            this.disabled = 1;
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form.name = item.name;
            this.form.password = item.password;
            this.dialog = true;
        },
        }
    }
</script>