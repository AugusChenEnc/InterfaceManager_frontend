const tagsView = {
	state: {
		visitedViews: []
	},
	mutations: {
		add_visited_views: (state, payload) => {

			/* 让当前的菜单回到最前面
			state.visitedViews.some(item => {
				if (item.path === payload.path) {
					const index = state.visitedViews.indexOf(item)
					state.visitedViews.splice(index, 1)
				}
			})*/

			if (state.visitedViews.some(item => item.path === payload.path)) return

			let _list = state.visitedViews;
			let _flag = true;
			
			_list.forEach(element => {
				if (element.title == payload.meta.title) {
					element.path = payload.path;
					_flag = false;
				}
			});
			if (_flag) {
				_list.push({
					title: payload.meta.title,
					path: payload.path
				})
			}
		},
		del_visited_views: (state, payload) => {
			
			const index = state.visitedViews.indexOf(payload)
			state.visitedViews.splice(index, 1)

		},
		remove_visited_views_all: (state) => {
			state.visitedViews.splice(0,state.visitedViews.length);
		}
	},
	actions: {
		addVisitedViews({ commit }, payload) {
			commit('add_visited_views', payload)
		},
		delVisitedViews({ commit, state }, payload) {
			return new Promise((resolve) => {
				commit('del_visited_views', payload)
				resolve([...state.visitedViews])
			})
		},
		removeVisitedViewsAll({ commit }) {
			commit('remove_visited_views_all')
		}
	}
}

export default tagsView