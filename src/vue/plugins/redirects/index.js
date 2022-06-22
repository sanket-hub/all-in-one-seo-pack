import store from '@/vue/store'
import { isBlockEditor, isWooCommerceProduct } from '@/vue/utils/context'
import { getPostEditedSlug, getPostStatus } from '@/vue/plugins/tru-seo/components'
import { debounce } from 'lodash-es'

export default class Redirects {
	previousPostSlug
	previousPostStatus
	updatingRedirects = false

	constructor () {
		const addon = window.aioseo.addons.find(item => 'aioseo-redirects' === item.sku)
		if (
			!window.aioseo.currentPost ||
			!addon ||
			!addon.isActive
		) {
			return
		}

		if (!window.aioseo.redirectsWatcherSet) {
			this.initWatchers()
			window.aioseo.redirectsWatcherSet = true
		}
	}

	initWatchers () {
		if (isWooCommerceProduct()) {
			return
		}

		if (isBlockEditor()) {
			const interval = window.setInterval(() => {
				const post = window.wp.data.select('core/editor').getCurrentPost()
				if (post.id) {
					window.clearInterval(interval)
					this.previousPostSlug = getPostEditedSlug()
					this.previousPostStatus = getPostStatus()
					this.watchBlockEditor()
				}
			}, 50)
		}
	}

	watchBlockEditor () {
		window.wp.data.subscribe(() => {
			if (!this.updatingRedirects) {
				this.update()
			}
		})
	}

	update = debounce(() => {
		const postSlug = getPostEditedSlug()
		const postStatus = getPostStatus()

		// If the slug or status is still the same, we don't need to update the redirects.
		if (this.previousPostSlug === postSlug && this.previousPostStatus === postStatus) {
			return
		}

		this.previousPostSlug = postSlug
		this.previousPostStatus = postStatus
		this.updatingRedirects = true
		store.dispatch('redirects/getPostRedirects', {}, { root: true }).finally(() => {
			this.updatingRedirects = false
		})
	}, 2500)
}

new Redirects()