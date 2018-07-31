<template>
	<!-- 换肤弹窗 -->
    <el-dialog :title="title" :visible.sync="projectDialog.projectDialog">
       <el-form ref="projectDetailsForm" :rules="projectRules" :inline="true" :model="projectDetailsForm"  label-position="right" label-width="90px">
       		<el-row>
	  			<el-form-item label="项目名称:" prop="name">
	      			<el-input v-model="projectDetailsForm.name" placeholder="项目名称" class="au-input"></el-input>
	      		</el-form-item>
	      		<el-form-item label="所属地区:" prop="area">
	      			<el-input v-model="projectDetailsForm.area" placeholder="所属地区" class="au-input"></el-input>
	      		</el-form-item>
                <el-form-item label="完成状态:" prop="status">
                    <el-select v-model="projectDetailsForm.status" placeholder="完成状态" class="au-input">
                        <el-option label="启动" value="1"></el-option>
                        <el-option label="暂停" value="2"></el-option>
                        <el-option label="进行中" value="3"></el-option>
                        <el-option label="结束" value="4"></el-option>
                    </el-select>
                </el-form-item>
       		</el-row>

       		<el-row>
	  			<el-form-item label="启动日期:" prop="startDate">
	      			<el-date-picker
				      v-model="projectDetailsForm.startDate"
				      type="date"
				      placeholder="选择日期"
                      class="au-datepicker">
				    </el-date-picker>
	      		</el-form-item>

	      		<el-form-item label="完成日期:" prop="endDate">
	      			<el-date-picker
				      v-model="projectDetailsForm.endDate"
				      type="date"
				      placeholder="选择日期"
                      class="au-datepicker">
				    </el-date-picker>
	      		</el-form-item>
       		</el-row>

       		<el-row>
      			<el-form-item label="项目描述:" prop="description">
    			    <el-input type="textarea" :rows="7" :cols="96" v-model="projectDetailsForm.description"></el-input>
    			</el-form-item>
       		</el-row>

	    </el-form>
	    <div slot="footer" class="dialog-footer">
            <el-button @click="handleCanel">取 消</el-button>
            <el-button type="primary" @click.native="handleConfirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapGetters , mapActions } from 'vuex'
import { fetchPost , fetchPut } from '@/utils/api'

export default{
	name: 'projectDetails',
	props: {
		title:{
			type: String,
			default: '增加项目'
		},
		detailsData:{
			default: this.projectDetailsForm
		}
	},
	computed: {
		...mapGetters(['projectDialog'])
	},
	watch: {
		detailsData: function(data) {
			this.projectDetailsForm = data;
			//把int 类型装换为String
			this.projectDetailsForm.status = this.projectDetailsForm.status.toString();
		}
	},
	data() {
		return {
			projectDetailsForm:{
				id: '',
				name: '',
                area: '',
                status: '',
				startDate: '',
				endDate: '',
				description: ''
			},
			projectRules: {
				name: [ { required: true, message: '请输入项目名称', trigger: 'blur' } ],
				area: [ { required: true, message: '请选择区域', trigger: 'blur'} ],
				status: [ { required: true, message: '请选择完成状态', trigger: 'blur'} ],
				startDate: [ { required: true, message: '请选择开始时间', trigger: 'blur'} ]
			}
		}
	},
	methods: {
		...mapActions(['changeProjectDialog']),
		handleConfirm(){
			this.$refs.projectDetailsForm.validate((valid) => {
				if (valid) {
					let detailsForm = this.projectDetailsForm;
					let startDate = detailsForm.startDate;
					let endDate = detailsForm.endDate;
					let status = detailsForm.status;

					if (endDate != null && endDate != "") {
						if (status != 4) {
							this.$message.error("项目结束，请选择结束状态！！");
							return;
						}
						if (endDate < startDate) {
							this.$message.error("请正确填写结束日期，结束日期不可小于开始日期！！");
							return;
						}
					} else {
						if (status == 4) {
							this.$message.error("项目结束，请填写结束日期");
							return;
						}
					}

					if (detailsForm.id != null || detailsForm.id != "") {
						fetchPut({
							url: '/project/updateProject',
							params: detailsForm
						}).then(response => {
							if (response.meta.statusCode = 200) {
								this.$emit('changeDetails', 'ok');
								this.changeProjectDialog();
								this.$refs.projectDetailsForm.resetFields();
							}
						}).catch(error => {
							this.$message.success('保存失败');	
						});
					} else {
						fetchPost({
							url:  '/project/saveProject',
							params: detailsForm
						}).then(response => {
							if (response.meta.statusCode = 200) {
								this.$emit('changeDetails', 'ok');
								this.changeProjectDialog();
								this.$refs.projectDetailsForm.resetFields();
							}
						}).catch(error => {
							this.$message.error("保存失败");
						})
					}
				}
			});
		},
		handleCanel(){
			this.changeProjectDialog();
			this.$refs.projectDetailsForm.resetFields();
		}
	}
}
</script>

<style scoped lang="stylus">
.au-input
    width 21rem
.au-datepicker
    width 36.1rem
</style>