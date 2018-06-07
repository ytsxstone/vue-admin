import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/common/app';
import common from './modules/common/common';
import session from './modules/common/session';
import user from './modules/admin/user';
import role from './modules/admin/role';
import pointRank from './modules/point/pointRank';
import pointRule from './modules/point/pointRule';
import attr from './modules/product/attr';
import category from './modules/product/category';
import product from './modules/product/product';

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
        common,
        session,
        user,
        role,
        pointRank,
        pointRule,
        attr,
        category,
        product,
    }
});
