import Vue from 'vue'
import Vuex from 'vuex'
import tagsviews from './modules/tagsView'
import dialogs from './modules/dialog'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
	modules: {
		tagsviews,
		dialogs
	},
	getters
})


export default store