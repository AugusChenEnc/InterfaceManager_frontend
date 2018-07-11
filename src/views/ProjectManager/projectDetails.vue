<template>
	<!-- 换肤弹窗 -->
    <el-dialog :title="title" :visible.sync="projectDialog.projectDialog">
       <el-form ref="projectDetailsForm" :inline="true" :model="projectDetailsForm" label-position="right" label-width="80px">
	  		
       		<el-row>
	  			<el-form-item label="项目名称:">
	      			<el-input v-model="projectDetailsForm.pname" placeholder="项目名称" class="au-input"></el-input>
	      		</el-form-item>
	      		<el-form-item label="所属地区:">
	      			<el-input v-model="projectDetailsForm.region" placeholder="所属地区" class="au-input"></el-input>
	      		</el-form-item>
                <el-form-item label="完成状态:">
                    <el-select v-model="projectDetailsForm.status" placeholder="完成状态" class="au-input">
                        <el-option label="启动" value="start"></el-option>
                        <el-option label="停止" value="end"></el-option>
                        <el-option label="进行中" value="running"></el-option>
                        <el-option label="结束" value="over"></el-option>
                    </el-select>
                </el-form-item>
       		</el-row>

       		<el-row>
	  			<el-form-item label="启动日期:">
	      			<el-date-picker
				      v-model="projectDetailsForm.startDate"
				      type="date"
				      placeholder="选择日期"
                      class="au-datepicker">
				    </el-date-picker>
	      		</el-form-item>

	      		<el-form-item label="完成日期:">
	      			<el-date-picker
				      v-model="projectDetailsForm.endDate"
				      type="date"
				      placeholder="选择日期"
                      class="au-datepicker">
				    </el-date-picker>
	      		</el-form-item>
       		</el-row>

       		<el-row>
      			<el-form-item label="项目描述:" prop="describe">
    			    <el-input type="textarea" :rows="7" :cols="96" v-model="projectDetailsForm.describe"></el-input>
    			</el-form-item>
       		</el-row>

	    </el-form>
	    <div slot="footer" class="dialog-footer">
            <el-button @click="changeProjectDialog">取 消</el-button>
            <el-button type="primary" @click.native="handleChangeTheme">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapGetters , mapActions } from 'vuex'

export default{
	name: 'projectDetails',
	props: {
		title:{
			type: String,
			default: '增加项目'
		}
	},
	computed: {
		...mapGetters(['projectDialog'])
	},
	data() {
		return {
			projectDetailsForm:{
				pname: '',
                region: '',
                status: '',
				startDate: '',
				endDate: '',
				describe: ''
			}
		}
	},
	methods: {
		...mapActions(['changeProjectDialog'])
	}
}
</script>

<style scoped lang="stylus">
.au-input
    width 21rem
.au-datepicker
    width 36.1rem
</style>