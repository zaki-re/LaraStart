<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users Table</h3>

                        <div class="card-tools">
                            <button
                                class="btn btn-success"
                                @click="openModel()"
                            >
                                Add new <i class="fas fa-user-plus fa-fw"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>registered at</th>

                                <th>Modify</th>
                            </tr>

                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <th>{{ user.type | upText }}</th>
                                <th>{{ user.created_at | myDate }}</th>

                                <td>
                                    <a href="#" @click="editModel(user)">
                                        <i class="fa fa-edit blue"></i>
                                    </a>
                                    /
                                    <a href="#" @click="deleteUser(user.id)">
                                        <i class="fa fa-trash red"></i>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>
        <!-- Modal -->
        <div
            class="modal fade"
            id="addNew"
            tabindex="-1"
            aria-labelledby="addNewLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5  v-show="!editmode" class="modal-title" id="addNewLabel">Add New User</h5>
                        <h5 v-show="editmode" class="modal-title" id="addNewLabel">Update User's Info</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form @submit.prevent="editmode ? updateUser() :createUser()">
                        <div class="modal-body">
                            <div class="form-group">
                                <input
                                    v-model="form.name"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('name')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="name"
                                ></has-error>
                            </div>

                            <div class="form-group">
                                <input
                                    v-model="form.email"
                                    type="text"
                                    name="email"
                                    placeholder="Email Adresse"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('email')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="email"
                                ></has-error>
                            </div>

                            <div class="form-group">
                                <textarea
                                    v-model="form.bio"
                                    type="text"
                                    name="bio"
                                    placeholder="Short bio for the user"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('email')
                                    }"
                                ></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>

                            <div class="form-group">
                                <select
                                    v-model="form.type"
                                    name="type"
                                    id="type"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('type')
                                    }"
                                >
                                    <option value=""> Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="author">Author</option>
                                </select>
                                <has-error :form="form" field="bio"></has-error>
                            </div>

                            <div class="form-group">
                                <input
                                    v-model="form.password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has(
                                            'password'
                                        )
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="name"
                                ></has-error>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button v-show="!editmode" type="submit" class="btn btn-primary">
                                Create
                            </button>
                            <button v-show="editmode" type="submit" class="btn btn-success">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        
        return {
        editmode: false,
        users: {},
            form: new Form({
                id:"",
                name: "",
                email: "",
                password: "",
                type: "",
                bio: "",
                photo: ""
            })
        };
    },
    methods: {
         editModel(user){
             this.editmode= true,
            this.form.reset()
              $("#addNew").modal("show");
            this.form.fill(user);

        },
        openModel(){
            this.editmode= false,   
            this.form.reset()
              $("#addNew").modal("show");


        },

        updateUser(){
                this.$Progress.start()
              this.form.put ('api/user/'+this.form.id).then(()=>{
                   
                   Fire.$emit("afterCreated");
                   $("#addNew").modal("hide");
                   swal.fire(
                                "Updated!",
                                "Your User has been Updated.",
                                "success"
                            );
                this.$Progress.finish(); 
              }).catch(()=>{
                this.$Progress.fail();
              })

        },


        deleteUser(id) {
            swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.form
                        .delete("/api/user/" + id)
                        .then(() => {
                            Fire.$emit("afterCreated");
                            swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                        })
                        .catch(() => {
                            swal.fire(
                                "failed!",
                                "Somethings want wrong.",
                                "warrning"
                            );
                        });
                }
            });
        },
        createUser() {
            this.$Progress.start();
            this.form
                .post("api/user")
                .then(() => {
                    Fire.$emit("afterCreated");
                    $("#addNew").modal("hide");
                    toast.fire({
                        icone: "success",
                        title: "Signed in successfully"
                    });
                    this.$Progress.finish();
                })
                .catch(() => {});
        },
        loadUser() {
            axios.get("api/user").then(({ data }) => (this.users = data.data));
        }
    },
    mounted() {
        console.log("Component mounted.");
        this.loadUser();
        Fire.$on("afterCreated", () => {
            this.loadUser();
        });
    }
};
</script>
