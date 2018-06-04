<template>
<div>
    <Card>
        <div class="page-body">
            <div> 
                <Row class="inline-block-right">
                      <Button type="ghost"  icon="plus" size="small" @click="creat_category"></Button>
                      <Button type="ghost"  icon="compose" size="small"  @click="edit_category"></Button>
                </Row>
            </div>
            <div class="margin-top:20">
                <Tree :data="data1"></Tree>
            </div>
        </div>
    </Card>
     <!-- @save-success="getPageData" -->
      <category-edit v-model="createModalShow"></category-edit>
</div>
</template>
<script>
import categoryEdit from './category-edit.vue';
    export default {
        components: {
            categoryEdit
        },
        data () {
            return {
                createModalShow: false,
                data1: [
                    {
                        title: '宝石',
                        expand: true,
                        children: [{
                                title: '祖母绿'
                            },{
                                title: '红宝石'
                            },{
                                title: '蓝宝石'
                            }]
                    },{
                        title: '珍珠',
                        expand: true,
                        children:[{
                            title:"淡水珠"
                        },{
                            title:"海水珠"
                        }]
                    },{
                        title:"翡翠",
                        expand:true,
                        children:[{
                            title:"冰种"
                        },{
                            title:"玻璃种"
                        },{
                            title:"芙蓉种"
                        }]
                    }
                ]
            }
        },
        methods:{
            creat_category(){
                this.createModalShow = true;
            },
            edit_category(){}
        }
    }
</script>