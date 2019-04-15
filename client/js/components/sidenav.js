Vue.component('sidenavigation', {
    props: ['email', 'randomFact', 'foreignExchange'],
    template: `
    <ul id="slide-out" class="sidenav">
        <li>
            <div class="user-view">
                <div class="background">
                    <img src="https://i.pinimg.com/originals/a4/8c/5c/a48c5c6d31119800605ef0de228e4631.png" alt="office">
                </div>
                <a href="#"><img class="circle" src="http://www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg"></a>
                <a href="#"><span class="white-text email">{{email}}</span></a>
            </div>
        </li>
        <li>
            <a href="#!"><i class="material-icons">question_answer</i>Random Fact</a>
        </li>
        <p style="margin-left:3%">{{randomFact}}</p>
        <li>
        <div class="divider"></div>
        </li>
        <li>
            <a href="#!"><i class="material-icons">attach_money</i>Currency Exchange (USD)</a>
        </li>
        <p style="margin-left:5%">GBP 🇬🇧 {{foreignExchange.GBP}}</p>
        <p style="margin-left:5%">IDR 🇮🇩 {{foreignExchange.IDR}}</p>
        <p style="margin-left:5%">SGD 🇸🇬 {{foreignExchange.SGD}}</p>
        <p style="margin-left:5%">MYR 🇲🇾 {{foreignExchange.MYR}}</p>
    </ul>
    `
})