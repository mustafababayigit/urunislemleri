import Vue from "vue";
import ProductList from "./components/products/ProductList";
import ProductSell from "./components/products/ProductSell";
import ProductPurchase from "./components/products/ProductPurchase";
import Auth from "./components/auth/Auth";
import VueRouter from "vue-router";
import token from "./store/modules/token"

Vue.use(VueRouter);

const routes = [
    { 
        path: "/", 
        component: ProductList,
        beforeEnter(to, from, next){
            if(token.getters.isAuthenticated){
                next();
            }else{
                next("/auth");
            }
        }
    },
    {   
        path: "/urun-islemleri", 
        component: ProductPurchase,
        beforeEnter(to, from, next){
            console.log(token.getters.isAuthenticated);
            if(token.getters.isAuthenticated){
                next();
            }else{
                next("/auth");
            }
        }
    },
    {   
        path: "/urun-cikisi", 
        component: ProductSell,
        beforeEnter(to, from, next){
            console.log(token.getters.isAuthenticated);
            if(token.getters.isAuthenticated){
                next();
            }else{
                next("/auth");
            }
        }
    },
    { path: "/auth", component: Auth},
    { path: "*", redirect: "/"}
];

export const router = new VueRouter({
    mode : "history",
    routes
})