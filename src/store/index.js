import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import session from './modules/session';
import user from './modules/user';
import role from './modules/role';
import pointRank from './modules/pointRank';
import pointRule from './modules/pointRule';
import product from './modules/product';
import category from './modules/category';
import common from './modules/common';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        app,
        session,
        user,
        role,
        pointRule,
        pointRank,
        product,
        category,
        common
    }
});
