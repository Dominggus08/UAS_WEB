<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5"> Notes </h3>
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
            </v-card-title>
            
            <v-data-table 
                :headers="headers" 
                :items="notes" 
                :search="search">

                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)"> edit </v-btn>
                    <v-btn small @click="deleteHandler(item.id)"> delete </v-btn>
                </template>

                <template v-slot:[`item.bidang`]="{ item }">
                    <v-icon v-if="item.bidang == `Penting`" class="mdi mdi-information" role="img" aria-hidden="false" @click="snackbar1=true"
                        color="red">   
                    </v-icon>
                    <v-icon v-else-if="item.bidang == 'Biasa'" class="mdi mdi-information" role="img" aria-hidden="false" @click="snackbar2=true"
                        color="green">   
                    </v-icon>
                    <v-icon v-else-if="item.bidang == 'Tidak Penting'" class="mdi mdi-information" role="img" aria-hidden="false" @click="snackbar3=true"
                        color="grey">   
                    </v-icon>
                </template>  

                <template v-slot:expanded-item="{ headers, item }">
                    <td v-if="item.bidang == `Penting`" :colspan="headers.length" class="color: red">
                        <b>{{ item.note }}</b> 
                    </td>
                    <td v-if="item.bidang == `Biasa`" :colspan="headers.length" class="color: green">
                        <b>{{ item.note }}</b> 
                    </td>
                    <td v-if="item.bidang == `Tidak Penting`" :colspan="headers.length" class="color: blue">
                        <b>{{ item.note }}</b> 
                    </td>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Note</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-select
                            v-model="form.bidang"
                            :items="['Penting', 'Biasa', 'Tidak Penting']"
                            label="Priority"
                            required>
						</v-select>
                        <v-text-field v-model="form.catatan" label="Catatan" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>
                <v-card-text>
                    Anda Yakin ingin menghapus kamar ini?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            headers: [
                {
                    text: "Priority",
                    align: "start",
                    sortable: true,
                    value: "bidang",
                },
                { text: "Catatan", value: "catatan" },
                { text: "Actions", value: "actions" },

            ],
            note: new FormData,
            notes: [],
            form: {
                bidang: null,
                catatan: null,
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
            var url = this.$api + '/note';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.notes = response.data.data;
            })
        },
        save() {
            this.note.append('bidang', this.form.bidang);
            this.note.append('catatan', this.form.catatan);

            var url = this.$api + '/note/'
            this.load = true;
            this.$http.post(url, this.note, {
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
                bidang : this.form.bidang,
                catatan : this.form.catatan
            };

            var url = this.$api + '/note/' + this.editId;
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
            var url = this.$api + '/note/' + this.deleteId;
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
            this.form.bidang = item.bidang;
            this.form.catatan = item.catatan;
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
            this.form = { bidang: null,
                catatan: null };
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