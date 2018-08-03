<template>
    <el-row class="au-interface-details">
        <el-col :span="24" class="au-col-top">
            <h1>幼儿园微信公众号</h1>
        </el-col>
        <el-col :span="5" class="au-col-left">
            <az-jstree @rightIsShowAndData="rightIsShowAndData"></az-jstree>
        </el-col>
        <el-col :span="19" class="au-col-right">
            <el-form label-position="right" label-width="9rem" v-show="isShow">
                <el-form-item label="输入框:" prop="name">
                    <el-input placeholder="项目名称" :value="testData1"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>


<script>
import JsTree from '@/components/JsTree'

export default {
    name: 'interfaceDetails',
    data(){
        return {
            isShow: true,
            testData1: 'default',
        }
    },
    components:{
        'az-jstree': JsTree
    },
    methods:{
        rightIsShowAndData(data){
            let _jsTreeData = JSON.parse(data);
            
            this.isShow = _jsTreeData.isShow;
            this.testData1 = _jsTreeData.data;
        }
    }
}
</script>

<style lang="stylus" scoped>
    .au-col-top
        height 5rem
    .au-col-left
        overflow hidden
        border 0.1rem solid #CCC
        height calc(100vh - 18rem)
    .au-col-right
        border 0.1rem solid #CCC
        height calc(100vh - 18rem)
</style>
