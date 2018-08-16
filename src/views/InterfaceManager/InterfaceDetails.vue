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
                    
                    <el-form-item label="请求地址：" prop="requestAddr">
                        <el-input placeholder="请求地址" v-model="interfaceDetailsForm.requestAddr"></el-input>
                    </el-form-item>

                    <el-form-item label="请求地址说明：" prop="requestAddrExplanin">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}" 
                            placeholder="请求地址说明"
                            v-model="interfaceDetailsForm.requestAddrExplanin"></el-input>
                    </el-form-item>
                    <div>
                        
                    </div>
                    <el-form-item label="请求类型：" prop="requestType">
                        <el-input placeholder="请求类型" v-model="interfaceDetailsForm.requestTYpe"></el-input>
                    </el-form-item>

                    <el-form-item label="请求数据：" prop="requestData">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="请求数据"
                            v-model="interfaceDetailsForm.requestData"></el-input>
                    </el-form-item>

                    <el-form-item label="请求数据说明：" prop="requestDataExplanin">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="请求数据说明"
                            v-model="interfaceDetailsForm.requestDataExplanin"></el-input>
                    </el-form-item>


                    <el-form-item label="响应数据：" prop="responseData">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="响应数据"
                            v-model="interfaceDetailsForm.responseData"></el-input>
                    </el-form-item>


                    <el-form-item label="响应数据说明：" prop="responseDataExplanin">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="响应数据说明"
                            v-model="interfaceDetailsForm.responseDataExplanin"></el-input>
                    </el-form-item>

                    <el-form-item label="备注：" prop="remark">
                        <el-input type="textarea"
                            :autosize="{ minRows: 5}"
                            placeholder="备注"
                            v-model="interfaceDetailsForm.remark"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button>重置</el-button>
                        <el-button type="primary">确定</el-button>
                    </el-form-item>
                </el-form>

            </el-scrollbar>
        </el-col>
    </el-row>
</template>


<script>
import JsTree from '@/components/JsTree'

export default {
    name: 'interfaceDetails',
    data(){
        return {
            isShow: false,
            interfaceDetailsForm: {
                requestAddr: '',
                requestAddrExplanin: '',
                requestType: '',
                requestData: '',
                requestDataExplanin: '',
                responseData: '',
                responseDataExplanin: '',
                remark: ''
            },
            interfaceRules:{
                requestAddr: [ { required: true, message: '请输入请求地址', trigger: 'blur' } ],
				requestAddrExplanin: [ { required: true, message: '请输入请求地址说明', trigger: 'blur'} ],
				requestType: [ { required: true, message: '请输入请求类型', trigger: 'blur'} ],
				requestData: [ { required: true, message: '请输入请求数据', trigger: 'blur'} ],
                requestDataExplanin: [ { required: true, message: '请输入请求数据说明', trigger: 'blur'}],
                responseData: [ { required: true, message: '请输入响应数据', trigger: 'blur'}],
                responseDataExplanin: [ { required: true, message: '请输入响应数据说明', trigger: 'blur'}],
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
            this.interfaceDetailsForm.requestAddr = _jsTreeData.data;
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
