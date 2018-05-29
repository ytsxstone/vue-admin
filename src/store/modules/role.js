import Ajax from '@/libs/ajax';

const role = {
    namespaced: true,
    state: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: [],
        loading: false,
        editRole: null,
        permissions: []
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setPageSize(state, pageSize) {
            state.pageSize = pageSize;
        },
        edit(state, role) {
            state.editRole = role;
        }
    },
    actions: {
        async getAll(context, payload) {
            context.state.loading = true;
            let response = await Ajax.get('/api/services/app/Role/GetAll', {params: payload.data});
            context.state.loading = false;
            let page = response.data.result;
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;
        },
        async get(context, payload) {
            let response = await Ajax.get('/api/services/app/Role/Get?Id=' + payload.id);
            return response.data.result;
        },
        async getAllPermissions(context) {
            let response = await Ajax.get('/api/services/app/Role/getAllPermissions');
            context.state.permissions = response.data.result.items;
        },
        async create(context, payload) {
            await Ajax.post('/api/services/app/Role/Create', payload.data);
        },
        async update(context, payload) {
            await Ajax.put('/api/services/app/Role/Update', payload.data);
        },
        async delete(context, payload) {
            await Ajax.delete('/api/services/app/Role/Delete?Id=' + payload.data.id);
        }
    }
};

export default role;
