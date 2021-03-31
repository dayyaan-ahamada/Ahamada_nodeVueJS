import Vue from 'vue'
import VueRouter from "vue-router";
import Articles from "@/components/ListArticles";
import ArticleDetail from "@/components/DetailArticle";
import FormArticle from "@/components/FormArticle";
import FormRegister from "@/components/FormRegister";
import FormConnection from "@/components/FormConnection";

Vue.use(VueRouter);

const routes = [
    {path: "/Articles", component: Articles},
    {path: "/Article/:article_title", component: ArticleDetail, props: true},
    {path: "/FormArticle/:mode", component: FormArticle, props: true},
    {path: "/FormArticle/:mode/:article_title/:article_body", component: FormArticle, props: true},
    {path: "/FormRegister", component: FormRegister},
    {path: "/FormConnection", component: FormConnection},
    {path: "/FormConnection/:message", component: FormConnection, props: true}
];

const router = new VueRouter({
    routes: routes
});

export default router