// Google Sign In
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    axios
        .post(`${serverUrl}/users/googleSignIn`, { token: id_token })
        .then(({ data }) => {
            const { details, userToken } = data
            const { id, email } = details
            if (!localStorage.getItem('token')) swal("Success!", `Welcome back, ${data.details.first_name}!`, "success")
            app.isLoggedIn = true
            app.currentPage = 'dashboard'
            app.email = email
            localStorage.setItem('token', userToken)
            localStorage.setItem('UserId', id)
            localStorage.setItem('email', email)
            app.getArticles()
            app.getRandomFact()
            app.getForeignExchange()
        })
        .catch((err) => {
            console.log(err)
        })
}

Vue.component('login', {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            axios
                .post(`${serverUrl}/users/signIn`, {
                    email: this.email,
                    password: this.password
                })
                .then(({ data }) => {
                    const { token, details } = data
                    const { id, email } = details
                    swal("Success!", `Welcome back, ${data.details.first_name}!`, "success")
                    localStorage.setItem('token', token)
                    localStorage.setItem('UserId', id)
                    localStorage.setItem('email', email)
                    this.email = ''
                    this.password = ''
                    this.$emit('login')
                })
                .catch((err) => {
                    const { message } = err.response.data
                    swal("Error!", message, "error");
                    this.email = ''
                    this.password = ''
                })
        }
    },
    template: `
    <div id="modalLoginForm" class="modal modal-fixed-footer">
        <div class="modal-content">
            <!-- Login Form -->
            <h3>Login</h3>
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input v-model="email" type="email" class="validate">
                        <label for="email">Email</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input v-model="password" type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>
            </form>
            <!-- End of Login Form -->
        </div>
        <div class="modal-footer">
            <div id="login_footer">
                <a class="modal-close btn-small cancelButton loginButtons"><i
                        class="material-icons left">cancel</i>Cancel</a>
                <div class="g-signin2 modal-close" data-onsuccess="onSignIn"></div>
                <a class="modal-close btn-small submitButton loginButtons" v-on:click="login"><i
                        class="material-icons left">check_box</i>Submit</a>
            </div>
        </div>
    </div>
    `
})