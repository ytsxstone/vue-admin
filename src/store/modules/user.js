import Ajax from '@/libs/ajax';

const user = {
    namespaced: true,
    state: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: [],
        loading: false,
        editUser: null,
        roles: []
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setPageSize(state, pageSize) {
            state.pageSize = pageSize;
        },
        edit(state, user) {
            state.editUser = user;
        }
    },
    actions: {
        async getAll(context, payload) {
            context.state.loading = true;
            let response = await Ajax.get('/api/services/app/User/GetAll', {params: payload.data});
            context.state.loading = false;
            let page = response.data.result;
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;
        },
        async get(context, payload) {
            let response = await Ajax.get('/api/services/app/User/Get?Id=' + payload.id);
            return response.data.result;
        },
        async getRoles(context) {
            let response = await Ajax.get('/api/services/app/User/GetRoles');
            context.state.roles = response.data.result.items;
        },
        async create(context, payload) {
            await Ajax.post('/api/services/app/User/Create', payload.data);
        },
        async update(context, payload) {
            await Ajax.put('/api/services/app/User/Update', payload.data);
        },
        async delete(context, payload) {
            await Ajax.delete('/api/services/app/User/Delete?Id=' + payload.data.id);
        },
        async changeLanguage(context, payload) {
            await Ajax.post('/api/services/app/User/ChangeLanguage', payload.data);
        },
        async updateUserInfo(context, payload) {
            await Ajax.put('/api/services/app/User/UpdateUserInfo', payload.data);
        },
        async changePassword(context, payload) {
            await Ajax.post('/api/services/app/User/ChangePassword', payload.data);
        },
    }
};

export default user;
