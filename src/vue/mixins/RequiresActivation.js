import { RequiresActivation as RequiresActivationMiddleware } from '@/vue/router/middleware'
export const RequiresActivation = {
	methods : {
		getExcludedActivationTabs (addon) {
			if (!this.isUnlicensed && this.$addons.isActive(addon) && !this.$addons.requiresUpgrade(addon)) {
				return []
			}

			const routes = []
			this.$router.options.routes.forEach(route => {
				if (!route.meta || !route.meta.middleware) {
					return
				}

				const middleware = Array.isArray(route.meta.middleware) ? route.meta.middleware : [ route.meta.middleware ]
				if (middleware.some(m => m === RequiresActivationMiddleware)) {
					routes.push(route.name)
				}
			})
			return routes
		}
	}
}