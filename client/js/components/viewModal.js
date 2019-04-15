Vue.component('viewmodal', {
    props: ['title', 'content'],
    template: `
    <div id="viewModal" class="modal">
        <div class="modal-content">
        <h4>{{title}}</h4>
        <p v-html="content"></p>
        </div>
        <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect btn-flat" style="color:whitesmoke;background-color:red">Close</a>
        </div>
    </div>
    `
})