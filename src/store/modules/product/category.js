import Ajax from '@/libs/ajax';

const category={
    namespaced: true,
    state: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: [],
        loading: false,
        editUser: null,
        categoryTree:[]
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
        },
        setCategory(state, categoryTree) {
            state.categoryTree = categoryTree;
        }
    },
    actions: {
        async getAll(context, payload) {
            context.state.loading = true;
            let response = await Ajax.get('/api/services/app/Category/GetAll', {params: payload.data});
            context.state.loading = false;
            let page = response.data.result;
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;
        },
        async get(context, payload) {
            let response = await Ajax.get('/api/services/app/Category/Get?Id=' + payload.id);
            return response.data.result;
        },
        async getCategory(context, payload) {
            let response = await Ajax.get('/api/services/app/Category/GetParent');
            return response.data.result;
        },
        async getTreeCategory(context) {
            let response = await Ajax.get('/api/services/app/Category/GetTreeCategory');
            context.state.categoryTree = response.data.result.items;
        },
        async create(context, payload) {
            await Ajax.post('/api/services/app/Category/Create', payload.data);
        },
        async update(context, payload) {
            await Ajax.put('/api/services/app/Category/Update', payload.data);
        },
        async delete(context, payload) {
            await Ajax.delete('/api/services/app/Category/Delete?Id=' + payload.data.id);
        }
    }
}

export default category;