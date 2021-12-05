<template>
    <v-main>
        <span class="headline">
            Nama Pengguna: {{name}}
            <v-spacer></v-spacer>
            Email: {{email}}
        </span>

            <v-btn @click="editHandler()">Edit Profile</v-btn>
            <v-btn @click="logout()">Log Out</v-btn>

            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Edit Profile</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-text-field v-model="form.name" label="date" required></v-text-field>
                            <v-text-field v-model="form.email" label="name" required :disabled="disabled"></v-text-field>
                            <v-text-field v-model="form.password" label="location" required></v-text-field>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                        <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
    </v-main>
</template>

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
            }
        }
    }
</script>