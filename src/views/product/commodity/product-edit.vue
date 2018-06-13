<template>
    <div>
        <Modal :title="title+'属性数据'" :value="value" :mask-closable="false" @on-ok="save" @on-visible-change="visibleChange">
            <Form ref="editForm" label-position="top" :rules="rules" :model="editModel">
                <FormItem label="所属分类" prop="categoryId">
                    <Input v-model="editModel.name" :maxlength="20" :minlength="1"></Input>
                    <Input v-model="editModel.name" :maxlength="20" :minlength="1"></Input>
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
    data () {
        const valideSort = (rule, value, callback) => {
            var regex = /^([1-9]\d*?)$/;
            if (!regex.test(value)) {
                callback(new Error('请输入大于0的整数'));
            } else {
                callback();
            }
        };
        return{
            editModel: {
                name: ''
            },
            rules: {
                name:[
                    { required: true, message: '属性名称不能为空', trigger: 'blur' }
                ]
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
    methods:{
        visibleChange(value) {
            if(!value) {
                this.$refs.editForm.resetFields();
                this.$emit('input', value);
            }
            else {
                if(this.title == '修改') {
                    //
                }
                else {
                    //移除ID属性
                    delete this.editModel['id'];
                }
            }
        },
        save() {
        },
        cancel() {
            this.$refs.editForm.resetFields();
            this.$emit('input', false);
        }
    }
}
</script>

