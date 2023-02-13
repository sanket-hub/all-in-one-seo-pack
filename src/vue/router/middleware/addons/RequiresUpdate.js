import Vue from 'vue'
export default function RequiresUpdate ({ next, router, to }) {
	// We need to do a manual check for licensed users here, though this could change after runtime.
	const isUnlicensed = 'pro' !== import.meta.env.VITE_VERSION.toLowerCase() || !window.aioseo.license.isActive

	if (isUnlicensed || !Vue.prototype.$addons.hasMinimumVersion(to.meta.middlewareData.addon)) {
		return router.push({ name: to.meta.middlewareData.routeName })
			.catch(() => {})
	}

	return next()
}