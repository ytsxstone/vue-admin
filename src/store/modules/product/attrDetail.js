import Ajax from '@/libs/ajax';

const attrDetail={
    namespaced: true,
    state: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: [],
        loading: false,
        editUser: null,
        allAttr:[]
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
            let response = await Ajax.get('/api/services/app/CategoryAttrDetail/GetAll', {params: payload.data});
            context.state.loading = false;
            let page = response.data.result;
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;
        },
        async get(context, payload) {
            let response = await Ajax.get('/api/services/app/CategoryAttrDetail/Get?Id=' + payload.id);
            return response.data.result;
        },
        async create(context, payload) {
            await Ajax.post('/api/services/app/CategoryAttrDetail/Create', payload.data);
        },
        async update(context, payload) {
            await Ajax.put('/api/services/app/CategoryAttrDetail/Update', payload.data);
        },
        async delete(context, payload) {
            await Ajax.delete('/api/services/app/CategoryAttrDetail/Delete?Id=' + payload.data.id);
        },
        async getAllAttr(context) {
            let response = await Ajax.get('/api/services/app/CategoryAttribute/GetAllAttr');
            context.state.allAttr = response.data.result.items;
        },
        async getAttr(context,payload) {
            let response = await Ajax.get('/api/services/app/CategoryAttrDetail/GetAttr?Id='+payload.data.id);
            context.state.list = response.data.result.items;
        }
    }
}

export default attrDetail;