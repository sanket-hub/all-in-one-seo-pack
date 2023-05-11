export default function RequiresUpgrade ({ app, next, router, to }) {
	// We need to do a manual check for licensed users here, though this could change after runtime.
	const isUnlicensed   = 'pro' !== import.meta.env.VITE_VERSION.toLowerCase() || !window.aioseo.license.isActive
	const licenseFeature = to.meta.licenseFeature || to.meta.middlewareData.licenseFeature || ''

	if (isUnlicensed || !app.$license.hasCoreFeature(app.$aioseo, licenseFeature[0], licenseFeature[1])) {
		next()
		return router.push({ name: to.meta.middlewareData.routeName })
			.catch(() => {})
	}

	return next()
}