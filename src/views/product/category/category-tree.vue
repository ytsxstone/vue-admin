<template>
    <div>
        <Card>
            <div class="page-body">
                <div>
                    <Row class="inline-block-right">
                        <Button type="ghost" icon="plus" size="small" @click="creat_category"></Button>
                        <Button type="ghost" icon="compose" size="small" @click="edit_category"></Button>
                    </Row>
                </div>
                <div class="margin-top:20">
                    <Tree :data="getTreeCategory"></Tree>
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
    data() {
        return {
            createModalShow: false
        }
    },
    computed: {
        getTreeCategory() {
            return this.$store.state.category.categoryTree;
        }
    },
    methods: {
        creat_category() {
            this.createModalShow = true;
        },
        edit_category() { }
    },
    async created() {
        await this.$store.dispatch({
            type:'category/getTreeCategory'
        });
    }
}
</script>