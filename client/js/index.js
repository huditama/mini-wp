const serverUrl = 'http://localhost:3000'

let app = new Vue({
    el: '#app',
    data: {
        // Check if any user is logged in
        isLoggedIn: false,
        currentPage: 'homepage',
        email: '',
        randomFact: '',
        foreignExchange: '',

        // Articles
        title: '',
        content: '',
        image: null,
        userArticles: [],
        search: '',
        editId: '',
        editTitle: '',
        editContent: '',
        editImage: '',
        viewTitle: '',
        viewContent: '',
    },
    created() {
        let token = localStorage.getItem('token')

        // Verify token
        if (token) this.verify()

        // Modals
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
        });

        // Side nav
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems);
        });
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    computed: {
        filterArticles() {
            return this.userArticles.filter((article) => {
                return article.title.toLowerCase().match(this.search)
            })
        }
    },
    methods: {
        getDashboard() {
            this.currentPage = 'dashboard'
            this.getArticles()
        },
        getCreateArticle() {
            this.currentPage = 'createArticle'
        },

        // USER METHODS
        verify() {
            let token = localStorage.getItem('token')
            let email = localStorage.getItem('email')
            axios
                .post(`${serverUrl}/users/verify`, { token }, { headers: { token } })
                .then(({ data }) => {
                    this.isLoggedIn = true
                    this.email = email
                    console.log(data.message)
                })
                .catch((err) => {
                    const { message } = err.response.data
                    swal("Error!", message, "error");
                    localStorage.removeItem('token')
                    localStorage.removeItem('UserId')
                    localStorage.removeItem('email')
                })
        },
        login() {
            let email = localStorage.getItem('email')
            this.currentPage = 'dashboard'
            this.isLoggedIn = true
            this.email = email
            this.getArticles()
            this.getRandomFact()
            this.getForeignExchange()
        },
        signOut() {
            swal({
                title: "Are you sure?",
                text: "We don't want to see you go so early :(",
                icon: "warning",
                buttons: true
            })
                .then((willLogout) => {
                    if (willLogout) {
                        swal("Success!", 'See you next time!', "success");
                        var auth2 = gapi.auth2.getAuthInstance();
                        auth2.signOut().then(function () {
                            console.log('User signed out.')
                        })
                        this.isLoggedIn = false
                        this.currentPage = 'homepage'
                        this.email = ''
                        this.randomFact = ''
                        this.foreignExchange = ''
                        localStorage.removeItem('token')
                        localStorage.removeItem('UserId')
                        localStorage.removeItem('email')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

        },
        getRandomFact() {
            let token = localStorage.getItem('token')
            axios
                .get(`${serverUrl}/users/randomFact`, { headers: { token } })
                .then(({ data }) => {
                    this.randomFact = data.text
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getForeignExchange() {
            let token = localStorage.getItem('token')
            axios
                .get(`${serverUrl}/users/foreignExchange`, { headers: { token } })
                .then(({ data }) => {
                    this.foreignExchange = data
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        // END OF USER METHODS

        // ARTICLE METHODS
        createArticle() {
            let token = localStorage.getItem('token')
            let formData = new FormData()
            formData.append('title', this.title)
            formData.append('content', this.content)
            formData.append('image', this.image)

            axios
                .post(`${serverUrl}/articles`, formData, {
                    headers: { token },
                    'Content-Type': 'multipart/form-data'
                })
                .then(({ data }) => {
                    swal("Success!", `${data.message}`, "success");
                    this.getArticles()
                    this.currentPage = 'dashboard'
                    this.title = ''
                    this.content = ''
                    this.image = ''
                })
                .catch((err) => {
                    let newErr = err.response.data.split(':')
                    let titleErr = newErr[2].split(',')[0]
                    let errorMessages = [titleErr, newErr[3]].join('\n')
                    swal("Error!", errorMessages, "error");
                    this.title = ''
                    this.content = ''
                    this.image = ''
                })
        },
        upload(event) {
            this.image = event.target.files[0]
            console.log(this.image)
        },
        getArticles() {
            let token = localStorage.getItem('token')
            axios
                .get(`${serverUrl}/articles`, { headers: { token } })
                .then(({ data }) => {
                    this.userArticles = data
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getEditArticleForm(id, title, content, image) {
            this.editId = id
            this.editTitle = title
            this.editContent = content
            this.editImage = image
        },
        editArticle(title, content, image) {
            let token = localStorage.getItem('token')
            let formData = new FormData()
            formData.append('title', title)
            formData.append('content', content)
            formData.append('image', image)

            axios
                .patch(`${serverUrl}/articles/${this.editId}`, formData, {
                    headers: { token },
                    'Content-Type': 'multipart/form-data'
                })
                .then(({ data }) => {
                    swal("Success!", `${data.message}`, "success");
                    this.getArticles()
                })
                .catch((err) => {
                    const { data } = err.response
                    swal("Error!", data, "error");
                })
        },
        viewArticleModal(title, content, image) {
            this.viewTitle = title
            this.viewContent = content
        },
        deleteArticle(ArticleId) {
            let token = localStorage.getItem('token')
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this article!",
                icon: "warning",
                buttons: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios
                            .delete(`${serverUrl}/articles/${ArticleId}`, { headers: { token } })
                            .then(({ data }) => {
                                swal("Success!", `"${data.deletedArticle.title}" has been deleted!`, "success")
                                this.getArticles()
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else swal("Phew.. That was close!")
                })
        }
        // END OF ARTICLE METHODS
    },
})
