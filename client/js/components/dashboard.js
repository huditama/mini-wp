Vue.component('dashboard', {
    props: ['userArticles', 'filterArticles'],
    methods: {
        getCreateArticle() {
            this.$emit('get-create-article')
        },
        getEditArticleForm(id, title, content, image) {
            this.$emit('get-edit-article-form', id, title, content, image)
        },
        deleteArticle(id) {
            this.$emit('delete-article', id)
        },
        viewArticle(title, content) {
            this.$emit('view-article-modal', title, content)
        }
    },
    template: `
    <div data-aos="flip-right">
            <div class="container" id="dashboard">
                    <div v-if="!userArticles.length">
                        <center>
                            <a v-on:click="getCreateArticle" class="waves-effect waves-light btn-large"
                                id="startPublishing"><i class="material-icons right">library_books</i>You haven't
                                published anything! Wanna start? </a>
                        </center>
                    </div>
                    <div class="row" v-if="userArticles.length">
                        <center>
                            <h3>Dashboard</h3>
                        </center>
                        <div v-for="(articles, index) in filterArticles" class="col s6">
                            <div class="card">
                                <div class="card-image">
                                    <img :src="articles.image" style="max-width:293.17px; min-width:293.17px; max-height:250px; min-height:250px">
                                    <span class="card-title">{{articles.title}}</span>
                                </div>
                                <div class="card-content">
                                    <p class="truncate" v-html="articles.content"></p>
                                </div>
                                <div class="card-action">
                                    <a class="modal-trigger" href="#viewModal" v-on:click="viewArticle(articles.title, articles.content)">View</a>
                                    <a class="modal-trigger" href="#modalEditForm"
                                        v-on:click="getEditArticleForm(articles._id, articles.title, articles.content, articles.image)">Edit</a>
                                    <a href="#" v-on:click="deleteArticle(articles._id)">Delete</a><br>
                                    <h6 style="margin-top:10%">Author:</h6>
                                    <h6 style="color:black">
                                        <i>{{articles.UserId.first_name + ' ' + articles.UserId.last_name}}</i></h6>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    `
})