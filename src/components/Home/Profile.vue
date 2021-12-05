<template>
    <v-main>
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
            <v-card-text align="center" class="text-h5 font-weight-bold">{{email}}</v-card-text>
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
                    <v-list-item-title align="left">{{name}}</v-list-item-title>
                </v-list-item-content>
                <v-row
                    align="center"
                    justify="end">
                    <v-btn
                        @click="editHandler(item)"
                        outlined
                        color="white"
                        class="ma-2">EDIT</v-btn>
                    <v-btn 
                        @click="logout()"
                        outlined
                        color="white"
                        class="ma-2">LOGOUT</v-btn>
                </v-row>
            </v-list-item>
            </v-card-actions>
        </v-card>
    </v-main>
</template>


<script>
export default {
    name: "List",
    data() {
        return {
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password'),
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,

            user: new FormData,
            users: [],
            form: {
                name: null,
                email: null,
                password: null,
            },
            deleteId: '',
            editId: ''
        };
    },
    methods: {
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },
        readData() {
            var url = this.$api + '/user';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.kamars = response.data.data;
            })
        },
        save() {
            this.kamar.append('name', this.form.name);
            this.kamar.append('email', this.form.email);
            this.kamar.append('password', this.form.password);

            var url = this.$api + '/user/'
            this.load = true;
            this.$http.post(url, this.user, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        update(){
            let newData = {
                name : this.form.name,
                password : this.form.password,
            };

            var url = this.$api + '/user/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        deleteData(){
            var url = this.$api + '/kamar/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandler(item) {
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form.tipe_kamar = item.tipe_kamar;
            this.form.kapasitas = item.kapasitas;
            this.form.harga = item.harga;
            this.form.urlPhoto = item.urlPhoto;
            this.dialog = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close() {
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = { tipe_kamar: null,
                kapasitas: null,
                harga: null };
        },
    },
    computed: {
        formTitle() {
            return this.inputType;
        },
    },
    mounted() {
        this.readData();
    },
};
</script>