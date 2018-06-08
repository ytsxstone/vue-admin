<style lang="less">
    @import "../../../assets/style/common.less";
</style>

<style scoped>
    .paging {
        float: right;
        margin-top: 10px;
    }
</style>

<template>
    <Row>
        <Col span="8">
            <category-tree></category-tree>
        </Col>
        <Col span="15" offset="1">
            <Card>
                <div slot="title">
                    分类对应属性数据
                </div>
                <div class="page-body">
                    <Row>
                        <Col span="13">
                            <Card>
                                <div slot="title">
                                    属性数据
                                </div>
                                <!-- <div class="margin-top-10">
                                <Table :loading="loading" :columns="columns" border :data="list"></Table>
                                <Page show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pageSizeChange" :page-size="pageSize" :current="currentPage"></Page>
                            </div> -->
                            </Card>
                        </Col>
                        <Col span="10" offset="1">
                            <Card>
                                <div slot="title">
                                    属性对应值数据
                                </div>
                                <div class="page-body">
                                    <!-- <div class="margin-top-10">
                                    <Table :loading="detailLoading" :columns="detailColumns" border :data="detailList"></Table>
                                    <Page show-sizer class-name="fengpage" :total="detailTotalCount" class="margin-top-10" @on-change="detailPageChange" @on-page-size-change="detailPageSizeChange" :page-size="detailPageSize" :current="detailCurrentPage"></Page>
                                </div> -->
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Col>
    </Row>
</template>

<script>
import categoryTree from './category-tree.vue';

export default {
    components: {
        categoryTree
    },
    data() {
        return {
            ajaxHistoryData: [],
            // 初始化信息总条数
            dataCount: 0,
            // 每页显示多少条
            pageSize: 10,
            historyData: []
        }
    },
    methods: {
        //
    },
    created() {
        //
    }
}
</script>