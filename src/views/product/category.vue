<style lang="less">
    @import '../../assets/style/common.less';
</style>
<style scoped>
  .paging{
      float:right;
      margin-top:10px;
  }
</style>

<template>
    <Row>
        <Col span="8">
            <category-tree></category-tree>
        </Col>
        <Col span="14"  offset="2">
            <Card>
                <div class="page-body">
                    <div>
                        <Row class="inline-block">
                            <!-- <Input type="text" v-model="keyWord" icon="search" placeholder="关键字" style="width: 200px" @keyup.enter.native="getPageData" />
                            <i-button type="primary" icon="ios-search" @click="getPageData">搜索</i-button> -->
                        </Row>
                        <Row class="inline-block-right">
                            <i-button type="primary" @click="createSetting"><Icon type="plus"></Icon> 新增设置</i-button>
                        </Row>
                    </div>
                    <div class="margin-top-20">
                            <can-edit-table refs="table2" v-model="editInlineData" :columns-list="editInlineColumns"></can-edit-table>
                        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
                    </div>
                </div>
            </Card>
        </Col>

    </Row>
</template>
<script>
import categoryTree from './components/category-tree.vue';
import canEditTable from './components/canEditTable.vue';
    let testData = {
        "editInlineData": [
            {
                name: 'Aresn',
                sex: '男',
                test: '1',
                work: '前端开发'
            },
            {
                name: 'Lison',
                sex: '男',
                test: '2',
                work: '前端开发'
            },
            {
                name: 'lisa',
                sex: '女',
                test: '3',
                work: '程序员鼓励师'
            }
        ],
        "editInlineColumns":[
            {
                title: '序号',
                type: 'index',
                width: 80,
                align: 'center'
            },
            {
                title: '排序',
                align: 'center',
                key: 'name',
                editable: true
            },
            {
                title: '父类',
                align: 'center',
                key: 'sex',
                editable: true
            },
            {
                title: '子类',
                align: 'center',
                key: 'test',
                editable: true
            },
            {
                title: '备注',
                align: 'center',
                key: 'work',
                editable: true
            },
            {
                title: '操作',
                align: 'center',
                width: 190,
                key: 'handle',
                handle: ['edit', 'delete']
            }
        ]
    }
    export default {
        components: {
            categoryTree,
            canEditTable
        },
        data () {
            return {
                ajaxHistoryData:[],
                editInlineData:[],
                // 初始化信息总条数
                dataCount:0,
                // 每页显示多少条
                pageSize:10,
                historyData: []
            }
        },
        methods:{
            getData(){
                this.editInlineColumns = testData.editInlineColumns;
                this.editInlineData = testData.editInlineData;
            },
            // 获取历史记录信息
            handleListApproveHistory(){
                // 保存取到的所有数据
                this.ajaxHistoryData = testData.editInlineData
                this.dataCount = testData.editInlineData.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.editInlineData.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
            },
            changepage(index){
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);
            },
            remove (index) {
                this.historyData.splice(index, 1);
                this.dataCount =historyData.length;
            },
            createSetting(){
                this.historyData.push({ name: "", sex: '', work: '' });
            }
        },
        created(){
             this.handleListApproveHistory();
             this.getData();
        }
    }
</script>