<template>
    <div>
        <Modal :title="title+'属性数据'" :value="value" :mask-closable="false" @on-ok="save" @on-visible-change="visibleChange">
            <Form ref="editForm" label-position="top" :rules="rules" :model="editModel">
                <FormItem label="所属分类" prop="categoryId">
                    <Cascader v-model="editModel.categoryId" :data="getCascader" filterable></Cascader>
                </FormItem>

                <FormItem label="属性名称" prop="name">
                    <Input v-model="editModel.name" :maxlength="16"></Input>
                </FormItem>
                <FormItem label="属性类型" prop="type">
                    <Select v-model="editModel.type" style="width:200px">
                        <Option v-for="item in attrTypeEnum" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select> 
                </FormItem>
                <FormItem label="排序" prop="sort">
                    <Input v-model="editModel.sort" :maxlength="8" number  style="width:200px"></Input>
                </FormItem>
                <FormItem prop="required">
                    <Checkbox v-model="editModel.required" size="large">是否必须</Checkbox>
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
export default {
    data () {
        const valideMinPoint = (rule, value, callback) => {
            var regex = /^([1-9]\d*?)$/;
            if (!regex.test(value)) {
                callback(new Error('请输入大于0的整数'));
            } else {
                callback();
            }
        };
        return{
            editModel: {
                categoryId: "",
                name: "",
                sort: 0,
                type: "",
                required: ''
            },
            rules: {
                // categoryId:[{ required: true, message: '所属分类不能为空', trigger: 'blur' }],
                name:[{ required: true, message: '属性名称不能为空', trigger: 'blur' }],
                sort:[
                    { required: true, type: 'number', message: '排序不为空', trigger: 'blur' },
                    { validator: valideMinPoint, trigger: 'blur' }
                ],
                // type:[{ required: true, message: '类型不为空', trigger: 'blur' }],
                // required:[{ required: true, message: '是否必须不为空', trigger: 'blur' }]
            }
        }
    },
    props: {
        title: {
            type: String,
            default: "添加"
        },
        value: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        attrTypeEnum() {
            return this.$store.state.attr.attrTypeEnum;
        },
        getCascader() {
            return this.$store.state.category.categoryCascader;
        }
    },
    methods:{
        visibleChange(value) {
            if(!value) {
                this.$refs.editForm.resetFields();
                this.$emit('input', value);
            }
            else {
                if(this.title == '修改') {
                    let response = this.$store.dispatch({
                        type:'attr/get',
                        id:this.$store.state.attr.editRuleId
                    }).then((response) => {
                        if(response&&response.data&&response.data.success&&response.data.result) {
                            this.editModel = Util.extend(true, {}, response.data.result);
                        }
                        else {
                            this.$Message.error('获取修改数据失败');
                        }
                    }).catch((error) => {
                        setTimeout(() => {this.$emit('input', false);}, 1500);
                    });
                }
                else {
                    //移除ID属性
                    delete this.editModel['id'];
                }
            }
        },
        save() {
            this.$refs.editForm.validate(async (valid)=>{
                if(valid) {
                    
                    let storeType = '';
                    if(this.title == '修改') {
                        storeType = 'attr/update';        
                    }
                    else {
                        storeType = 'attr/create';        
                    }
                    if (this.editModel.categoryId.length > 0) {
                        this.editModel.categoryId = this.editModel.categoryId[this.editModel.categoryId.length - 1]
                    }
                    let response = await this.$store.dispatch({
                        type:storeType,
                        data:this.editModel
                    });
                    if(response&&response.data&&response.data.success) {
                        this.$Message.success(this.title+'成功');
                    }
                    this.$refs.editForm.resetFields();
                    this.$emit('save-success');
                    this.$emit('input', false);
                }
            });
        },
        cancel() {
            this.$refs.editForm.resetFields();
            this.$emit('input', false);
        }
    },
    async created() {
        await this.$store.dispatch({
            type:'category/getCascader'
        });
    }
}
</script>

