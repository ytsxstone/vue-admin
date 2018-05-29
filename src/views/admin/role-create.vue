<template>
    <div>
        <Modal
            title="新增角色"
            :value="value"
            @on-ok="save"
            @on-visible-change="visibleChange"
         >
            <Form ref="roleForm" label-position="top" :rules="rules" :model="roleModel">
                <Tabs value="detail">
                    <TabPane label="RoleDetails" name="detail">
                        <FormItem label="RoleName" prop="name">
                            <Input v-model="roleModel.name" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                        <FormItem label="DisplayName" prop="displayName">
                            <Input v-model="roleModel.displayName" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                        <FormItem label="Description" prop="description">
                            <Input v-model="roleModel.description" :maxlength="1024"></Input>
                        </FormItem>
                        </TabPane>
                    <TabPane label="RolePermission" name="permission">
                        <CheckboxGroup v-model="roleModel.permissions">
                            <Checkbox :label="permission.name" v-for="permission in permissions" :key="permission.name"><span>{{permission.displayName}}</span></Checkbox>
                        </CheckboxGroup>
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
    export default {
        data () {
            return {
                value: false,
                roleModel: {
                    name: '',
                    displayName: '',
                    description: '',
                    isStatic: false,
                    permissions: []
                },
                rules: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    displayName: [
                        { required: true, message: '显示名称不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        computed: {
            permissions() {
                return this.$store.state.role.permissions;
            }
        },
        methods: {
            visibleChange(value) {
                if(!value) {
                    this.$emit('input',value);
                }
            },
            save() {
                this.$refs.roleForm.validate(async (valid)=>{
                    if(valid) {
                        if(!this.roleModel.permissions) {
                            this.roleModel.permissions = [];
                        }
                        await this.$store.dispatch({
                            type:'role/create',
                            data:this.roleModel
                        });
                        this.$refs.roleForm.resetFields();
                        this.$emit('save-success');
                        this.$emit('input',false);
                    }
                });
            },
            cancel() {
                this.$refs.roleForm.resetFields();
                this.$emit('input', false);
            }
        }
    }
</script>
