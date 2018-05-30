<template>
    <div>
        <Modal
            title="添加用户"
            :value="value"
            @on-ok="save"
            @on-visible-change="visibleChange"
         >
            <Form ref="userForm" label-position="top" :rules="rules" :model="userModel">
                <Tabs value="detail">
                    <TabPane label="基本信息" name="detail">
                        <FormItem label="帐号" prop="userName">
                            <Input v-model="userModel.userName" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                        <FormItem label="姓名" prop="name">
                            <Input v-model="userModel.name" :maxlength="32"></Input>
                        </FormItem>
                        <FormItem label="密码" prop="password">
                            <Input v-model="userModel.password" type="password" :maxlength="32"></Input>
                        </FormItem>
                        <FormItem prop="isActive">
                            <Checkbox v-model="userModel.isActive">是否激活</Checkbox>
                        </FormItem>
                    </TabPane>
                    <TabPane label="用户角色" name="roleNames">
                        <FormItem prop="roleNames">
                            <CheckboxGroup v-model="userModel.roleNames">
                                <Checkbox :label="role.normalizedName" v-for="role in roles" :key="role.id"><span>{{role.name}}</span></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </TabPane>
                </Tabs>
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
            return {
                userModel: {
                    userName: '',
                    name: '',
                    surname: 'stone',
                    emailAddress: 'd55D@qq.com',
                    password: '',
                    isActive: true,
                    roleNames: []
                },
                rules: {
                    userName:[{ required: true, message: '帐号不能为空', trigger: 'blur' }],
                    name:[{ required: true, message: '姓名不能为空', trigger: 'blur' }],
                    password:[{ required: true, message: '密码不能为空', trigger: 'blur' }]
                }
            };
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            roles() {
                return this.$store.state.user.roles;
            }
        },
        methods: {
            visibleChange(value) {
                if(!value) {
                    this.$refs.userForm.resetFields();
                    this.$emit('input', value);
                }
                else {
                    this.userModel = Util.extend(true, {}, this.$store.state.user.editUser);
                }
            },
            save() {
                this.$refs.userForm.validate(async (valid)=>{
                    if(valid) {
                        if(!this.userModel.permissions) {
                            this.userModel.permissions = [];
                        }
                        await this.$store.dispatch({
                            type:'user/update',
                            data:this.userModel
                        });
                        this.$refs.userForm.resetFields();
                        this.$emit('save-success');
                        this.$emit('input', false);
                    }
                });
            },
            cancel() {
                this.$refs.userForm.resetFields();
                this.$emit('input', false);
            }
        }
    }
</script>