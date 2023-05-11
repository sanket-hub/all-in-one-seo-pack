export default function RequiresUpdate ({ app, next, router, to }) {
	// We need to do a manual check for licensed users here, though this could change after runtime.
	const isUnlicensed = 'pro' !== import.meta.env.VITE_VERSION.toLowerCase() || !window.aioseo.license.isActive

	if (isUnlicensed || !app.$addons.hasMinimumVersion(to.meta.middlewareData.addon)) {
		next()
		return router.push({ name: to.meta.middlewareData.routeName })
			.catch(() => {})
	}

	return next()
}