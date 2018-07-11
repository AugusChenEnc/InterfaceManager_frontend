import Vue from 'vue'
import VueI18n from 'vue-i18n'

//language
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementFtLocale from 'element-ui/lib/locale/lang/zh-TW'
import enLocale from './en'
import zhLocale from './zh'
import ftLocale from './ft'

Vue.use(VueI18n)

const messages = {
	en:{
		...enLocale,
    	...elementEnLocale
	},
	zh:{
		...zhLocale,
		...elementZhLocale
	},
	ft:{
		...ftLocale,
		...elementFtLocale
	}
}

const i18n = new VueI18n({
	locale: localStorage.lang || 'ft',
	messages
})

export default i18n
