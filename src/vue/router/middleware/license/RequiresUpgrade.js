import Vue from 'vue'
export default function RequiresUpgrade ({ next, router, to }) {
	// We need to do a manual check for licensed users here, though this could change after runtime.
	const isUnlicensed   = 'pro' !== import.meta.env.VITE_VERSION.toLowerCase() || !window.aioseo.license.isActive
	const licenseFeature = to.meta.licenseFeature || to.meta.middlewareData.licenseFeature || ''

	if (isUnlicensed || !Vue.prototype.$license.hasCoreFeature(licenseFeature[0], licenseFeature[1])) {
		return router.push({ name: to.meta.middlewareData.routeName })
			.catch(() => {})
	}

	return next()
}