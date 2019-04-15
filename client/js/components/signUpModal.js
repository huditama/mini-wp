Vue.component('signup', {
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            axios
                .post(`${serverUrl}/users/signUp`, {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password
                })
                .then(({ data }) => {
                    swal("Success!", `${data.message}`, "success")
                    this.first_name = ''
                    this.last_name = ''
                    this.email = ''
                    this.password = ''
                })
                .catch((err) => {
                    const { errors } = err.response.data
                    let errorMessages = []
                    for (let key in errors) errorMessages.push(errors[key].message)
                    errorMessages = errorMessages.join('\n')

                    swal("Error!", errorMessages, "error");
                    this.first_name = ''
                    this.last_name = ''
                    this.email = ''
                    this.password = ''
                })
        }
    },
    template: `
    <div id="modalSignupForm" class="modal modal-fixed-footer">
        <div class="modal-content">
            <h3>Sign Up</h3>
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <input v-model="first_name" type="text" class="validate" required>
                        <label for="first_name">First Name</label>
                    </div>
                    <div class="input-field col s6">
                        <input v-model="last_name" type="text" class="validate" required>
                        <label for="last_name">Last Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input v-model="email" type="email" class="validate" required>
                        <label for="email">Email</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input v-model="password" type="password" class="validate" required>
                        <label for="password">Password</label>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <a class="modal-close btn-small cancelButton"><i class="material-icons left">cancel</i>Cancel</a>
            <a class="modal-close btn-small submitButton" v-on:click="register"><i
                    class="material-icons left">check_box</i>Submit</a>
        </div>
    </div>
    `
})