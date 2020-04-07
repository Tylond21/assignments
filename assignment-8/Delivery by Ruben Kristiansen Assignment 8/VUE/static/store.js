// a separate vue instance used as store
// this stores the products and cart items

let store = new Vue({
    data: {
        // the products offered in the store, will be loaded using AJAX
        products: {},
        // the product items in the cart
        cart: []
    },
    created: async function() {
        // on creation fetch products from store
        let response = await fetch('/products');
        if (response.status == 200) {
            let result = await response.json();
            this.products = result;
        }
    },
    methods: {
        addToCart: function(pid, size, count) {
            // add an item to the cart
            if (typeof count == "string") {
                count = parseInt(count);
            }

            let found = this.cart.find(
                function(cartItem) {
                    return (cartItem.pid == pid && cartItem.size == size);
                }
            );
            if (found) {
                found.count += count;
            }
            else {
                this.cart.push({
                    pid: pid,
                    size: size,
                    count: count
                });
            }
        },
        remove: function(pid, size) {
            // remove an item with specific size from the cart
            let found = this.cart.findIndex(
                function(cartItem) {
                    return (cartItem.pid == pid && cartItem.size == size);
                }
            );
            if (found > -1) {
                this.cart.splice(found, 1);
            }
        },
        clean: function() {
            // empty the cart
            this.cart = [];
        }
    }
})