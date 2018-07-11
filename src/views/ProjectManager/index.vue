<template>
    <el-row id="projectManager">
        <el-row type="flex">
            <el-col :span="5">
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="changeProjectDialog">增加项目</el-button>
            </el-col>
            <el-col :span="19">
                <el-form :inline="true" ref="projectForm" :model="projectForm"  style="float: right">
                    <el-form-item label="项目名称:">
                        <el-input v-model="projectForm.pname" placeholder="项目名称" class="au-input"></el-input>
                    </el-form-item>
                    <el-form-item label="启动日期:">
                       <el-form-item>
                           <el-date-picker
                                v-model="projectForm.date" 
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
                        <el-select v-model="projectForm.region" placeholder="状态" class="au-select">
                            <el-option label="启动" value="start"></el-option>
                            <el-option label="停止" value="end"></el-option>
                            <el-option label="进行中" value="running"></el-option>
                            <el-option label="结束" value="over"></el-option>
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
                <el-table-column prop="endDate" label="完成日期"  width="150"></el-table-column>
                <el-table-column prop="status" label="完成状态" ></el-table-column>
                <el-table-column prop="description" label="项目描述" width="500"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
        </el-row>


        <!-- 弹框 -->
        <project-details :title="detailsTitle"></project-details>
    </el-row>
</template>

<script>
import { mapActions  } from 'vuex'
import ProjectDetails from '@/views/ProjectManager/projectDetails'
import { fetchGet } from '@/utils/api'

export default{
    name: 'projectManager',
    data() {
      return {
        projectForm:{
            pname: '',
            date:[] ,
            region: ''
        },
        detailsTitle: '增加项目',
        fullWidth: null,
        currentPage4: 4,
        tableData: []
      }
    },
    created(){
        this.loadTableData()
    },
    components: { ProjectDetails },
    methods: {
        ...mapActions(['changeProjectDialog']),
        loadTableData(){
            console.log('执行查询');
            fetchGet({
                url: '/project/getAll'
            }).then(response => {
                console.log(response)
                if (response.meta.statusCode == 200){
                    let _pageData = response.data;

                    //1、load table data
                    this.tableData = _pageData.list;

                } else {
                    this.$message.error('数据加载异常');
                }
            }).catch(error => {
                this.$message.error(error.meta.message);
            });
        },
        dateFormat:function(row, column) {
            let date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        onsubmit(){
            console.log('执行查询')
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
        width 10rem
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