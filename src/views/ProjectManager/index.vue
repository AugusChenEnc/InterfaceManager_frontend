<template>
    <el-row id="projectManager">
        <el-row type="flex">
            <el-col :span="5">
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openAddProjectDialog">增加项目</el-button>
            </el-col>
            <el-col :span="19">
                <el-form :inline="true" :model="projectForm"  style="float: right">
                    <el-form-item label="项目名称:">
                        <el-input v-model="projectForm.name" placeholder="项目名称" class="au-input"></el-input>
                    </el-form-item>
                    <el-form-item label="启动日期:">
                       <el-form-item>
                           <el-date-picker
                                v-model="projectForm.startDate" 
                                type="daterange" 
                                start-placeholder="开始日期" 
                                end-placeholder="结束日期" 
                                format="yyyy-MM-dd" 
                                value-format="yyyy-MM-dd"
                                class="au-picker">
                            </el-date-picker>
                       </el-form-item>
                    </el-form-item>
                    <el-form-item label="完成状态:">
                        <el-select v-model="projectForm.status" placeholder="状态" class="au-select">
                            <el-option label="请选择状态" value="-1"></el-option>
                            <el-option label="启动" value="1"></el-option>
                            <el-option label="暂停" value="2"></el-option>
                            <el-option label="进行中" value="3"></el-option>
                            <el-option label="结束" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onsubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="tableData" border style="width: 100%" class="au-table">
                <el-table-column prop="name" label="项目名称" width="200"></el-table-column>
                <el-table-column prop="area" label="所属地区"></el-table-column>
                <el-table-column prop="startDate" label="启动日期" :formatter="dateFormat" width="150"></el-table-column>
                <el-table-column prop="endDate" label="完成日期" :formatter="dateFormat" width="150"></el-table-column>
                <el-table-column prop="status" label="完成状态" :formatter="selectFormat" ></el-table-column>
                <el-table-column prop="description" label="项目描述" width="500"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="openUpdateProjectDialog(scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row style="float: right; margin-top: 1rem">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.pageNum"
              :page-sizes="[10, 15, 20]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total">
            </el-pagination>
        </el-row>

        <!-- 弹框 -->
        <project-details :title="detailsTitle" @changeDetails="changeDetails"></project-details>
    </el-row>
</template>

<script>
import { mapActions  } from 'vuex'
import ProjectDetails from '@/views/ProjectManager/projectDetails'
import { fetchPost } from '@/utils/api'

export default{
    name: 'projectManager',
    data() {
      return {
        projectForm:{
            name: '',
            startDate:[] ,
            status: '-1'
        },
        page: {
            total: 1,
            pageNum: 1,
            pageSize: 10
        },
        detailsTitle: '增加项目',
        tableData: [],
      }
    },
    created(){
        this.loadTableData(this.pageNum, this.pageSize);
    },
    components: { ProjectDetails },
    methods: {
        ...mapActions(['changeProjectDialog']),
        loadTableData(){
            let _projectForm = this.requestDaterangeProcesser(this.page, this.projectForm);

            fetchPost({
                url: '/project/getAll/',
                params: _projectForm
            }).then(response => {
                if (response.meta.statusCode == 200){
                    let _pageData = response.data;
                    
                    this.tableData = _pageData.list;
                    this.page.total = _pageData.total;
                    this.page.pageNum = _pageData.pageNum;
                    this.page.pageSize = _pageData.pageSize;
                } else {
                    this.$message.error('数据加载异常');
                }
            }).catch(error => {
                this.$message.error(error.meta.message);
            });
        },
        //format
        dateFormat(row, column) {
            let date = row[column.property];
            if (date == null) {
                return "待定";
            }
            return this.$moment(date).format("YYYY-MM-DD");
        },
        selectFormat(row, column) {
            let data = row[column.property];
            let result = '启动';
            switch(data) {
                case 1:
                    result = '启动';
                    break;
                case 2:
                    result = '暂停';
                    break;
                case 3:
                    result = '进行中';
                    break;
                case 4:
                    result = '结束';
                    break;
            }
            return result;
        },
        //dialog
        openAddProjectDialog(){
            this.detailsTitle = '增加项目';
            this.changeProjectDialog();
        },
        openUpdateProjectDialog(row){
            console.log(row.id);
            this.detailsTitle = '修改项目';
            this.changeProjectDialog();
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(pageSize) {
            this.page.pageNum = 1;
            this.page.pageSize = pageSize;
            this.loadTableData();
        },
        handleCurrentChange(pageNum) {
            this.page.pageNum = pageNum;
            this.loadTableData();
        },
        changeDetails(){
            this.loadTableData(this.pageNum, this.pageSize);
        },
        onsubmit(){
            this.loadTableData(1, this.pageSize);
        },
        requestDaterangeProcesser(page, requestData){
            let newRequestData = new Object();
            newRequestData.pageNum = page.pageNum;
            newRequestData.pageSize = page.pageSize;
            newRequestData.sort = 'start_date desc';
            newRequestData.name = requestData.name;
            newRequestData.status = requestData.status;
        
            let startDate = requestData.startDate;
            if (startDate != null && startDate.length > 0){
                newRequestData.startDate = startDate[0];
                newRequestData.endDate = startDate[1];
            } else {
                newRequestData.startDate = "";
                newRequestData.endDate = "";
            }

            return newRequestData;
        }
    }
}
</script>

<style scoped lang="stylus">
    .au-input
        width 17rem
    .au-picker
        width 23rem
    .au-select
        width 12rem
    .el-row
        margin 1rem 0
    .au-table ::-webkit-scrollbar
        height 1rem
    .au-table ::-webkit-scrollbar-track
        -webkit-box-shadow inset 0 0 6px rgba(0,0,0,0.2)
        border-radius 1rem
        background-color #F5F5F5
    .au-table ::-webkit-scrollbar-thumb
        border-radius 1rem
        -webkit-box-shadow inset 0 0 6px rgba(0,0,0,0.2)
        background-color #b9b9b9;
</style>