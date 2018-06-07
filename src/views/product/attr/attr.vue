<style lang="less">
@import "../../../assets/style/common.less";
</style>
<template>
    <div>
        <Card>
            <p slot="title">
                属性数据
            </p>
            <Row>
                <Col span="12">
                <Card>
                    <div slot="title">
                        属性数据
                        <div class="inline-block-right">
                            <Button type="ghost" icon="plus" size="small" @click="addAttr">新增属性</Button>
                        </div>
                    </div>
                    <div class="margin-top-10">
                        <Table :loading="loading" :columns="columns" border :data="list"></Table>
                        <Page show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pageSizeChange" :page-size="pageSize" :current="currentPage"></Page>
                    </div>
                </Card>
                </Col>
                <Col span="10" offset="1">
                <Card>
                    <div slot="title">
                        属性对应值数据
                        <!-- <div class="inline-block-right">
                            <Button type="ghost" icon="plus" size="small" @click="createSetting">新增属性值</Button>
                        </div> -->
                    </div>
                    <div class="page-body">
                        <div>
                        </div>
                        <!-- <div class="margin-top-10">
                        <Table :loading="loading" :columns="columns" border :data="list"></Table>
                        <Page show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pageSizeChange" :page-size="pageSize" :current="currentPage"></Page>
                    </div> -->
                    </div>
                </Card>
                </Col>
            </Row>
        </Card>
        <attr-edit v-model="editModalShow" :title="modalTitle" @save-success="getPageData"></attr-edit>
    </div>
</template>
<script>
import attrEdit from './attr-edit.vue';
export default {
    name: 'attr',
    components: {
        attrEdit
    },
    data() {
        return {
            editModalShow: false,
            modalTitle: '添加',
            attrs: {
                create: true,
                edit: true,
                delete: true,
            },
            columns: [{
                title: '属性名',
                key: "name"
            }, {
                title: "排序",
                key: "sort"
            },
            {
                title: "属性类型",
                render:(h,params)=>{
                    return h('span', this.switchActionName(params.row.type))
                }
            },
            {
                title: "是否必须",
                render:(h,params)=>{
                    return h('tag',{ 
                        props:{
                            color:params.row.required?'yellow':'default',
                        },
                    }, params.row.required?'是':'否');
                }
            },
            {
                title: '操作',
                key: 'Actions',
                width: 160,
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                icon: 'android-create',
                                disabled: !this.attrs.edit
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.$store.commit('role/edit', params.row.id);
                                    this.edit();
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small',
                                icon: 'android-delete',
                                disabled: this.attrs.delete ? (params.row.isStatic ? true : false) : true
                            },
                            on: {
                                click: async () => {
                                    this.$Modal.confirm({
                                        title: 'Tips',
                                        content: '您确定要删除这条数据吗?',
                                        okText: '确定',
                                        cancelText: '取消',
                                        onOk: async () => {
                                            let response = await this.$store.dispatch({
                                                type: 'role/delete',
                                                data: params.row
                                            });
                                            if (response && response.data && response.data.success) {
                                                this.$Message.success('删除成功');
                                                await this.$store.dispatch({
                                                    type: 'user/getRoles'
                                                });
                                            }
                                            await this.getPageData();
                                        }
                                    });
                                }
                            }
                        }, '删除')
                    ]);
                }
            }]
        }
    },
    computed: {
        list() {
            return this.$store.state.attr.list;
        },
        loading() {
            return this.$store.state.attr.loading;
        },
        pageSize() {
            return this.$store.state.attr.pageSize;
        },
        totalCount() {
            return this.$store.state.attr.totalCount;
        },
        currentPage() {
            return this.$store.state.attr.currentPage;
        }
    },
    methods: {
        addAttr() {
            this.editModalShow = true;
            this.modalTitle = '添加';
        },
        edit () {
            this.editModalShow = true;
            this.modalTitle = '修改';
        },
        pageChange(page) {
            this.$store.commit('attr/setCurrentPage', page);
            this.getPageData();
        },
        pageSizeChange(pageSize) {
            this.$store.commit('attr/setPageSize', pageSize);
            this.getPageData();
        },
        async getPageData() {
            let pageRequest = {};
            pageRequest.maxResultCount = this.pageSize;
            pageRequest.skipCount = (this.currentPage-1)*this.pageSize;
            await this.$store.dispatch({
                type: 'attr/getAll',
                data: pageRequest
            });
        },
        switchActionName(key) {
            let pointActions = this.$store.state.attr.attrTypeEnum;
            let actionKey = parseInt(key);
            let actionName = '未定义';
            // 匹配积分动作
            pointActions.forEach(item => {
                if(item.id == actionKey) {
                    actionName = item.name;
                }
            });

            return actionName;
        }
    }
}  
</script>