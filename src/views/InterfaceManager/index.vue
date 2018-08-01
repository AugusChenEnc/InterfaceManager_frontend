<template>
    <div class="au-interface-manager">
        <el-row type="flex" align="middle" v-for="(project, index) in projectList" :key="index">
            <el-col :span="4" v-for="(item, index) in project" :key="index" :offset="index > 0 ? 1 : 0" class="au-card-check">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="~assets/images/login_background1.jpg" class="image">
                    <div style="padding: 10px;">
                        <span>项目名称：{{ item.name }}</span>
                        <br/>
                        <span>所属地区：{{ item.area }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import { fetchGet } from '@/utils/api'

export default {
    name: 'interface_manager',
    data(){
        return {
            currentDate: new Date(),
            projectList: []
        }
    },
    created(){
        this.defaultLoadData()
    },
    methods:{
        defaultLoadData(){
            fetchGet({
                url: '/project/getAllGroup'
            }).then(response => {
                console.log(response);
                this.projectList = response.data;
            }).catch(error => {
                this.$message.error('加载错误');
            });
        }
    }  
}
</script>

<style lang="stylus" scoped>
    img 
        width 100%
    .el-row
        margin-bottom 2rem
    .au-card-check
        transition transform 0.2s
        cursor pointer
    .au-card-check:hover
        transform scale(1.1,1.1)
</style>

