<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form ref="userForm" v-model="init" :model="userModel" :label-width="100" label-position="right" :rules="rules">
                    <FormItem label="姓名" prop="name">
                        <div style="display:inline-block;width:250px;">
                            <Input v-model="userModel.name"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="登录密码：">
                        <Button type="dashed" size="small" @click="showEditPassword">修改密码</Button>
                    </FormItem>
                    <div style="padding-left:50px;">
                        <Button @click="cancel">取消</Button>
                        <Button type="primary" @click="save">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
        <change-password v-model="editPasswordModalShow"></change-password>
    </div>
</template>

<script>
import changePassword from './change-password.vue';

export default {
    name: 'ownspace',
    components: {
        changePassword
    },
    data () {
        return {
            editPasswordModalShow: false,
            userModel: {
                id: 0,
                name: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        init() {
            if(this.$store.state.session.user) {
                this.userModel.id = this.$store.state.session.user.id;    
                this.userModel.name = this.$store.state.session.user.name;
            }
            else {
                this.userModel.id = 0;
                this.userModel.name = '';
            }
            return this.userModel.id;
        }
    },
    methods: {
        showEditPassword () {
            this.editPasswordModalShow = true;
        },
        cancel () {
            this.$refs.userForm.resetFields();
            this.$emit('input', false);

            // 关闭标签页
            this.$store.commit('app/removeTag', 'ownspace');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        save () {
            this.$refs.userForm.validate(async (valid) => {
                if (valid) {
                    await this.$store.dispatch({
                        type:'user/updateUserInfo',
                        data:this.userModel
                    });
                    this.$refs.editPasswordForm.resetFields();
                    this.$emit('input', false);
                }
            });
        }
    }
};
</script>
