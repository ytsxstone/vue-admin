<template>
    <div>
        <Modal
            title="添加分类"
            :value="value"
            :mask-closable="false"
            @on-ok="save"
            @on-visible-change="visibleChange"
         >
            <Form ref="categoryForm" label-position="top" :rules="rules" :model="categoryModel">
                <FormItem label="分类名" prop="name">
                    <Input v-model="categoryModel.name" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem label="排序" prop="name">
                    <Input v-model="categoryModel.name" :maxlength="5" :minlength="1"></Input>
                </FormItem>
                <FormItem label="备注" prop="name">
                    <Input v-model="categoryModel.name" :maxlength="1024"></Input>
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
    export default{
        data(){
            return{
                categoryModel:{
                    name:""
                },
                rules: {
                    name:[{ required: true, message: '用户名不能为空', trigger: 'blur' }]
                },
                categoryData:[]
            }
        },   
        props: {
        value: {
            type: Boolean,
            default: false
        },
    },
        methods:{
            visibleChange(value) {
                if(!value) {
                    this.$refs.categoryForm.resetFields();
                    this.$emit('input', value);
                }
            },
            cancel(){
                this.$refs.categoryForm.resetFields();
                this.$emit('input', false);
            },
            save(){},
        }
    }
</script>