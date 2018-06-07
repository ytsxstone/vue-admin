import Ajax from '@/libs/ajax';

const attr={
    namespaced: true,
    state: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: [],
        loading: false,
        editUser: null,
        attrTypeEnum: []
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
            if(context.state.attrTypeEnum.length <= 0) {
                await context.dispatch('getAllAttrTypeEnum');
            }
            let response = await Ajax.get('/api/services/app/CategoryAttribute/GetAll', {params: payload.data});
            context.state.loading = false;
            let page = response.data.result;
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;
        },
        async getAllAttrTypeEnum(context) {
            let response = await Ajax.get('/api/services/app/CategoryAttribute/GetAllAttributeType');
            context.state.attrTypeEnum = response.data.result.items;
        },
        async get(context, payload) {
            let response = await Ajax.get('/api/services/app/CategoryAttribute/Get?Id=' + payload.id);
            return response.data.result;
        },
        async create(context, payload) {
            await Ajax.post('/api/services/app/CategoryAttribute/Create', payload.data);
        },
        async update(context, payload) {
            await Ajax.put('/api/services/app/CategoryAttribute/Update', payload.data);
        },
        async delete(context, payload) {
            await Ajax.delete('/api/services/app/CategoryAttribute/Delete?Id=' + payload.data.id);
        }
    }
}

export default attr;