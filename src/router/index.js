import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'
import Home from "../views/Home.vue";
import Register from '../views/auth/register'
import Login from '../views/auth/login'
import Dashboard from '../views/back/dashboard'
////////////////////////////////////////////////
import Majorcat from '../views/back/Majorcat'
import MajorcatForm from '../views/back/Majorcat/form'
import MajorcatShow from '../views/back/Majorcat/show'
import MajorcatEdit from '../views/back/Majorcat/edit'
////////////////////////////////////////////////
import Category from '../views/back/Category'
import CategoryForm from '../views/back/Category/form'
import CategoryShow from '../views/back/Category/show'
import CategoryEdit from '../views/back/Category/edit'
////////////////////////////////////////////////
import Product from '../views/back/Product'
import ProductForm from '../views/back/Product/form'
import ProductShow from '../views/back/Product/show'
import ProductEdit from '../views/back/Product/edit'

Vue.use(VueRouter);

  var token = store.getters.Token
  const routes = [
    {path: "/",name: "Home",component: Home},
    {path: "/login",component: Login},
    {path: "/register",component: Register},
    {path: "/dashboard",component: Dashboard, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
    {path: "/product",component: Product, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
    /////////////////////////////////////////////////////////
    {path: "/majorcat",component: Majorcat, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
    {path: "/majorcat/create",component: MajorcatForm, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},

    {path: "/majorcat/show/:id",component: MajorcatShow, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
    {path: "/majorcat/:id/edit",component: MajorcatEdit, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
    /////////////////////////////////////////////////////////
    {path: "/category",component: Category, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
    {path: "/category/create",component: CategoryForm, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},

    {path: "/category/show/:id",component: CategoryShow, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
    {path: "/category/:id/edit",component: CategoryEdit, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
    /////////////////////////////////////////////////////////
    {path: "/products",component: Product, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
    {path: "/products/create",component: ProductForm, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},

    {path: "/products/show/:id",component: ProductShow, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
    {path: "/products/:id/edit",component: ProductEdit, beforeEnter(to, from, next) {
      if (token){
        next()
      }else{
        next('/login')
      }
    }},
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
