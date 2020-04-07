let product = {
    props: ["pid"],
    template: `
    <main class="content main">
        <aside-cart></aside-cart>
        <div v-if="product.unavailable">
            <h1>Error, no product found!</h1>
        </div>
        
        <div v-else >
            <div class="framed flexbox">
                <div class="img-box">
                    <img v-bind:src="'/static/images/' + product.img" alt="Socks" width="280px"/>
                    <div v-if="product.discount > 0" class="discount-badge">{{product.discount}}%</div>
                </div>
                <div class="product_right">
                    <div class="product_info">
                        <h3><div class="price">{{product.price}},-</div>{{product.title}}</h3>
        
                        <p>{{product.description}}</p>
                    </div>    
                    <div class="product_form">
                        <form>
                            <label for="count">Count: 
                            <input type="number" v-model="count" min="0" name="count" size="3" width="3" class="small64"></label>
                            <br>
                            <label for="size">Size: 
                            <select name="size" v-model="size">
                                <option value="S">36-38</option>
                                <option value="M">39-41</option>
                                <option value="L">42-44</option>
                                <option value="XL">45-47</option>
                            </select></label>
                            <br>
                            <label for="price">Price: 
                                <input disabled name="price" v-bind:value="price" class="small64"></label>
                        </form>
                    </div>
                    <div class="product_submit">
                        <button type="button" v-on:click="add">Add to Cart</button>
                    </div>
                </div>
            </div>
        
            <h1>Details</h1>
        
            <div class="framed">
                {{ product.details }}
            </div>
        </div>
    </main>
    `,
    data: function() {
        return {
            count: 1,
            size: "S",
        }
    },
    methods: {
        add: function() {
            if (this.count > 0) {
                store.addToCart(this.pid, this.size, this.count);
                this.count = 1;
            }
        }
    },
    computed: {
        product: function() {

            if (store.products[this.pid]) {
                return store.products[this.pid];
            }
            if (store.products.length > 0) {
                return store.products[0];
            }
            return { unavailable: true };
        },
        price: function() {

            if (this.product.unavailable) {
                return "";
            }
            let priceCent = this.product.price * (100 - this.product.discount);
            return (priceCent / 100).toFixed(2);
        }
    }
}