let main = {
    template: `
    <main class="content main">
        <aside-cart></aside-cart>
        <div>
            <div class="banner">
                <img src="/static/images/boxes.jpg" alt="some boxes">
                <span class="text">SALE</span>
            </div>
            <div class="article-box">
            <article v-for="prod, id in products">
                <router-link v-bind:to="'/product/' + id">
                    <img v-bind:src="'/static/images/' + prod.img" />
                    <div class="discount-badge" 
                        v-if="prod.discount > 0">{{prod.discount}}%</div>
                    <h3><div class="price">{{prod.price}},-</div>{{prod.title}}</h3>

                    <p>{{prod.description}}</p>
                </router-link>               
            </article>
            </div> 
        </div>
    </main>
    `,
    computed: {
        products: function() {
            return store.products;
        }
    }
}