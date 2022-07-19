// @since 4.2.3
const wp = window.wp || {}

if ('undefined' !== typeof wp.data) {
	wp.data.subscribe(function () {
		const editor = wp.data.select('core/editor')
		const wpNotices = wp.data.select('core/notices').getNotices()
		const aioseoNotices = editor?.getCurrentPostAttribute('aioseo_notices')
		if (editor?.isSavingPost() && !editor.isAutosavingPost() && aioseoNotices) {
			aioseoNotices.forEach((notice) => {
				if (!notice.message || wpNotices.find(not => not.id === notice.options.id)) {
					return
				}

				// Strip tags because Gutenberg warnings do not support HTML tags.
				notice.message = notice.message.replace(/(<([^>]+)>)/gi, '')

				// Gutenberg does not support target="_blank" so we need a little magic.
				if (notice.options?.actions) {
					notice.options.actions.map((action) => {
						if ('_blank' === action?.target) {
							action.onClickUrl = action.url
							action.onClick = function () {
								window.open(action.onClickUrl)
								wp.data.dispatch('core/notices').removeNotice(notice.options.id)
							}
							delete action.url
							delete action.target
						}

						return action
					})
				}

				wp.data.dispatch('core/notices').createNotice(
					notice.status || 'warning', // Can be one of: success, info, warning, error.
					notice.message, // Text string to display.
					notice.options || []
				)
			})
		}
	})
}