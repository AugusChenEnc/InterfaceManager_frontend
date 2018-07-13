const dialog = {
	state: {
		projectDialog: false
	},
	mutations: {
		change_project_dialog: (state) => {
			state.projectDialog =  !state.projectDialog;
		}
	},
	actions: {
		changeProjectDialog({commit}){
			commit('change_project_dialog')
		}
	}
}

export default dialog