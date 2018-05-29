import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import session from './modules/session';
import user from './modules/user';
import role from './modules/role';

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
        role
    }
});
