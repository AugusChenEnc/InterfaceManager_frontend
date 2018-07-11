
export function loginVerify(to, from , next) {
	if (!localStorage.token) {
	    next({
	      path: '/login',
	      query: { redirect: to.fullPath }
	    })
	} else {
	    next()
	}
}
