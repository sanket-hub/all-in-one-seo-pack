import { RequiresUpdate as RequiresUpdateMiddleware } from '@/vue/router/middleware'
export const RequiresUpdate = {
	methods : {
		getExcludedUpdateTabs (addon) {
			if (!this.isUnlicensed && this.$addons.hasMinimumVersion(addon) && !this.$addons.requiresUpgrade(addon)) {
				return []
			}

			const routes = []
			this.$router.options.routes.forEach(route => {
				if (!route.meta || !route.meta.middleware) {
					return
				}

				const middleware = Array.isArray(route.meta.middleware) ? route.meta.middleware : [ route.meta.middleware ]
				if (middleware.some(m => m === RequiresUpdateMiddleware)) {
					routes.push(route.name)
				}
			})
			return routes
		}
	}
}