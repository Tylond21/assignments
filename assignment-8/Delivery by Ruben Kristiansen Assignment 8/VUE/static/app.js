// vue router
let router = new VueRouter({
    routes: [
        { path: '/', component: main },
        { path: '/product/:pid', component: product, props: true },
        { path: '/cart', component: cart }
    ]
});

// main vue instance
let app = new Vue({
    el: '#app',
    router: router
})