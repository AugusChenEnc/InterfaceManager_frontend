<template>
    <el-row class="au-interface-details">
        <el-col :span="24" class="au-col-top">
            <h1>幼儿园微信公众号</h1>
        </el-col>
        <el-col :span="5" class="au-col-left">
            <az-jstree @rightIsShowAndData="rightIsShowAndData"></az-jstree>
        </el-col>
        <el-col :span="19" class="au-col-right">

            <el-scrollbar>
                <el-form ref="interfaceDetailsForm"
                    :model="interfaceDetailsForm" 
                    :rules="interfaceRules"
                    label-position="right" label-width="13rem" v-show="isShow" class="au-interface-elform">
                    
                    <el-form-item prop="id" v-show="false">
                        <el-input v-model="interfaceDetailsForm.id"></el-input>
                    </el-form-item>
                    <el-form-item prop="treeId" v-show="false">
                        <el-input v-model="interfaceDetailsForm.treeId"></el-input>
                    </el-form-item>
                    

                    <el-form-item label="请求地址：" prop="reqAddress">
                        <el-input placeholder="请求地址" v-model="interfaceDetailsForm.reqAddress"></el-input>
                    </el-form-item>

                    <el-form-item label="请求地址说明：" prop="reqAddressExplanin">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}" 
                            placeholder="请求地址说明"
                            v-model="interfaceDetailsForm.reqAddressExplanin"></el-input>
                    </el-form-item>
                    <div>
                        
                    </div>
                    <el-form-item label="请求类型：" prop="reqType">
                        <el-input placeholder="请求类型" v-model="interfaceDetailsForm.reqType"></el-input>
                    </el-form-item>

                    <el-form-item label="请求数据：" prop="reqData">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="请求数据"
                            v-model="interfaceDetailsForm.reqData"></el-input>
                    </el-form-item>

                    <el-form-item label="请求数据说明：" prop="reqDataExplanin">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="请求数据说明"
                            v-model="interfaceDetailsForm.reqDataExplanin"></el-input>
                    </el-form-item>


                    <el-form-item label="响应数据：" prop="respData">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="响应数据"
                            v-model="interfaceDetailsForm.respData"></el-input>
                    </el-form-item>


                    <el-form-item label="响应数据说明：" prop="respDataExplanin">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="响应数据说明"
                            v-model="interfaceDetailsForm.respDataExplanin"></el-input>
                    </el-form-item>

                    <el-form-item label="备注：" prop="remark">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="备注"
                            v-model="interfaceDetailsForm.remark"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button>重置</el-button>
                        <el-button type="primary" @click="changeConfirm">确定</el-button>
                    </el-form-item>
                </el-form>

            </el-scrollbar>
        </el-col>
    </el-row>
</template>


<script>
import JsTree from '@/components/JsTree'
import { fetchGet, fetchPut } from '@/utils/api'

export default {
    name: 'interfaceDetails',
    data(){
        return {
            isShow: false,
            interfaceDetailsForm: {
                id: '',
                treeId: '',
                reqAddress: '',
                reqAddressExplanin: '',
                reqType: '',
                reqData: '',
                reqDataExplanin: '',
                respData: '',
                respDataExplanin: '',
                remark: ''
            },
            interfaceRules:{
                reqAddress: [ { required: true, message: '请输入请求地址', trigger: 'blur' } ],
				reqType: [ { required: true, message: '请输入请求类型', trigger: 'blur'} ],
                respData: [ { required: true, message: '请输入响应数据', trigger: 'blur'}],
            }
        }
    },
    components:{
        'az-jstree': JsTree
    },
    methods:{
        rightIsShowAndData(data){
            let _jsTreeData = JSON.parse(data);
            
            this.isShow = _jsTreeData.isShow;
            let _treeId = _jsTreeData.data;

            fetchGet({
                url: '/interfaceDetail/'+ _treeId + '/findInterfaceDetail'
            }).then(response => {
                this.interfaceDetailsForm = response.data;
            }).catch(error => {
                console.log(error);
            })
        },
        changeConfirm(){
            this.$refs.interfaceDetailsForm.validate(valid => {
                if (valid) {
                    console.log(this.interfaceDetailsForm);
                    fetchPut({
                        url: '/interfaceDetail/amendInterfaceDetail',
                        params: this.interfaceDetailsForm
                    }).then(response => {
                        this.$message.success('操作成功');
                    }).catch(error => {
                        this.$message.error('操作失败');
                    });
                }
            })
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
        .el-scrollbar
            height 100%
    .au-interface-elform
        margin 2rem
</style>
