<template>
    <div>
        <Modal title="添加分类" :value="value" :mask-closable="false" @on-ok="save" @on-visible-change="visibleChange">
            <Form ref="categoryForm" label-position="top" :rules="rules" :model="categoryModel">
                <FormItem label="上级分类" prop="name">
                    <Select v-model="categoryModel.parentId" not-found-text="暂无类型信息" @on-change="changeCategory" clearable style="width:200px">
                        <Option v-for="item in categoryData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select> 
                </FormItem>
                <FormItem label="分类名" prop="name">
                    <Input v-model="categoryModel.name" :maxlength="20" :minlength="1"></Input>
                </FormItem>
                <FormItem label="排序" prop="sort">
                    <Input v-model="categoryModel.sort" :maxlength="5" :minlength="1"></Input>
                </FormItem>
                <FormItem label="备注" prop="remark">
                    <Input v-model="categoryModel.remark" :maxlength="1024"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">取消</Button>
                <Button @click="save" type="primary">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Util from '@/libs/util.js';
export default {
    data() {
        return {
            categoryModel: {
                parentId: '',
                name: "",
                sort: 0,
                remark: ""
            },
            rules: {
                name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
                sort: [{ required: true, message: "排序不为空", trigger: "blur" }],
                remark: [{ required: true, message: "备注不为空", trigger: "blur" }]
            },
            categoryData:[]
        };
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        list() {
            return this.$store.state.Category.list;
        },
        loading() {
            return this.$store.state.Category.loading;
        },
        pageSize() {
            return this.$store.state.Category.pageSize;
        },
        totalCount() {
            return this.$store.state.Category.totalCount;
        },
        currentPage() {
            return this.$store.state.Category.currentPage;
        }
    },
    methods: {
        getCategoryData: function () {
            // com.loading(true);
            // com.api.category.getList().done(function (result) {
            //     com.loading(false);
            //     categoryApp.categoryData = result.items;
            // });
             this.$store.dispatch({
                type: 'category/getCategory'
             }).then(response=>{
                //  console.info(response.items);
                 this.categoryData = Util.extend(true, {}, response.items);
                //  console.info(categoryData)
             })

        },
        visibleChange(value) {
            if (!value) {
                this.$refs.categoryForm.resetFields();
                this.$emit("input", value);
            }
        },
        cancel() {
            this.$refs.categoryForm.resetFields();
            this.$emit("input", false);
        },
        save() { 
            this.$refs.categoryForm.validate(async (valid)=>{
                if(valid) {
                    // if(!this.categoryForm.parentId) {
                    //     this.categoryForm.parentId = [];
                    // }
                    console.info(this.$refs.categoryForm)
                    console.info(this.categoryModel)
                    let response = await this.$store.dispatch({
                        type:'category/create',
                        data:this.categoryModel
                    });
                    if(response&&response.data&&response.data.success) {
                        this.$Message.success('添加成功');
                        this.getCategoryData();
                    }
                    this.$refs.categoryForm.resetFields();
                    this.$emit('save-success');
                    this.$emit('input', false);
                }
            });
        },
        changeCategory(value) {

        },
        async getPageData() {
            let pageRequest = {};
            pageRequest.maxResultCount = this.pageSize;
            pageRequest.skipCount = (this.currentPage-1)*this.pageSize;
            pageRequest.keyWord = this.keyWord;
            await this.$store.dispatch({
                type: 'product/getAll',
                data: pageRequest
            });
        }
    },
    created() {
        this.getCategoryData();
    }
};
</script>