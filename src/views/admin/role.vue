<style lang="less">
    @import '../../assets/style/common.less';
</style>

<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" no-data-text="暂无数据" border :data="list"></Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pageSizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <role-create v-model="createModalShow"  @save-success="getPage"></role-create>
        <role-edit v-model="editModalShow"  @save-success="getPage"></role-edit>
    </div>
</template>

<script>
import RoleCreate from './role-create.vue';
import RoleEdit from './role-edit.vue';

export default {
    name: 'role',
    components: {
        RoleCreate,
        RoleEdit
    },
    data () {
        return {
            createModalShow: false,
            editModalShow: false,
            columns: [{
                title: '角色名称',
                key: 'name'
            },{
                title: '显示名称',
                key: 'displayName'
            },{
                title: '描述',
                key: 'description'
            },{
                title: '是否静态(预构建)',
                render: (h,params)=>{
                    return h('span',params.row.isStatic?'是':'否');
                }
            },{
                title: 'Actions',
                key: 'Actions',
                width:150,
                render:(h,params)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            style:{
                                marginRight:'5px'
                            },
                            on:{
                                click:()=>{
                                    this.$store.commit('role/edit', params.row);
                                    this.edit();
                                }
                            }
                        }, 'Edit'),
                        h('Button',{
                            props:{
                                type:'error',
                                size:'small'
                            },
                            on:{
                                click:async ()=>{
                                    this.$Modal.confirm({
                                            title: 'Tips',
                                            content: 'DeleteRolesConfirm',
                                            okText: 'Yes',
                                            cancelText: 'No',
                                            onOk:async()=>{
                                                await this.$store.dispatch({
                                                    type: 'role/delete',
                                                    data: params.row
                                                });
                                                await this.getPage();
                                            }
                                    })
                                }
                            }
                        }, 'Delete')
                    ])
                }
            }]
        };
    },
    computed: {
        list() {
            return this.$store.state.role.list;
        },
        loading() {
            return this.$store.state.role.loading;
        },
        pageSize() {
            return this.$store.state.role.pageSize;
        },
        totalCount() {
            return this.$store.state.role.totalCount;
        },
        currentPage() {
            return this.$store.state.role.currentPage;
        }
    },
    methods: {
        create() {
            this.createModalShow = true;
        },
        edit() {
            this.editModalShow = true;
        },
        pageChange(page) {
            this.$store.commit('role/setCurrentPage', page);
            this.getPage();
        },
        pageSizeChange(pageSize){
            this.$store.commit('role/setPageSize', pageSize);
            this.getPage();
        },
        async getPage(){
            let where = '';
            let pageRequest = {};
            pageRequest.maxResultCount = this.pageSize;
            pageRequest.skipCount = (this.currentPage-1)*this.pageSize;
            pageRequest.where = where;
            await this.$store.dispatch({
                type: 'role/getAll',
                data: pageRequest
            });
        }
    },
    async created() {
        this.getPage();
        await this.$store.dispatch({
            type:'role/getAllPermissions'
        });
    }
};
</script>
