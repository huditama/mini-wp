Vue.component('editform', {
    props: ['editTitle', 'editContent', 'editImage'],
    data() {
        return {
            title: '',
            content: '',
            image: ''
        }
    },
    methods: {
        editArticle() {
            this.$emit('edit-article', this.title, this.content, this.image)
        },
        upload(event) {
            this.image = event.target.files[0]
        }
    },
    watch: {
        editTitle(value) {
            this.title = value
        },
        editContent(value) {
            this.content = value
        },
        editImage(value) {
            this.image = value
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    template: `
    <div id="modalEditForm" class="modal modal-fixed-footer">
        <div class="modal-content">
            <div class="container">
                <h6><b><u>Edit Article</u></b></h6>
                <div class="input-field col s12" style="margin-top:3%">
                    <input v-model="title" type="text" class="validate">
                </div>
                <wysiwyg v-model="content" id="text_editor">
                </wysiwyg>
                <div class="file-field input-field">
                        <div class="btn">
                            <span>Image</span>
                            <input type="file" v-on:change="upload">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" v-model="image" type="text">
                        </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a class="modal-close btn-small cancelButton"><i class="material-icons left">cancel</i>Cancel</a>
            <a class="modal-close btn-small submitButton" v-on:click="editArticle"><i
                    class="material-icons left">check_box</i>Submit</a>
        </div>
    </div>
    `
})