export default {
	updateTaxonomyTitle (state, payload) {
		this._vm.$set(state.liveTags, 'taxonomy_title', payload)
	},
	updateTaxonomyDescription (state, payload) {
		this._vm.$set(state.liveTags, 'taxonomy_description', payload)
	},
	updatePermalink (state, payload) {
		this._vm.$set(state.liveTags, 'permalink', payload)
	},
	updatePostTitle (state, payload) {
		this._vm.$set(state.liveTags, 'post_title', payload)
	},
	updatePostContent (state, payload) {
		this._vm.$set(state.liveTags, 'post_content', payload)
	},
	updatePostExcerpt (state, payload) {
		this._vm.$set(state.liveTags, 'post_excerpt', payload)
	},
	updateAttachmentCaption (state, payload) {
		this._vm.$set(state.liveTags, 'attachment_caption', payload)
	},
	updateAttachmentDescription (state, payload) {
		this._vm.$set(state.liveTags, 'attachment_description', payload)
	},
	updateAltTag (state, payload) {
		this._vm.$set(state.liveTags, 'alt_tag', payload)
	},
	updateCategories (state, payload) {
		this._vm.$set(state.liveTags, 'categories', payload)
	},
	updateWooCommerceBrand (state, payload) {
		this._vm.$set(state.liveTags, 'woocommerce_brand', payload)
	},
	updateWooCommerceSku (state, payload) {
		this._vm.$set(state.liveTags, 'woocommerce_sku', payload)
	},
	updateWooCommercePrice (state, payload) {
		this._vm.$set(state.liveTags, 'woocommerce_price', payload)
	},
	updatePermalinkSlug (state, payload) {
		this._vm.$set(state, 'permalinkSlug', payload)
	}
}