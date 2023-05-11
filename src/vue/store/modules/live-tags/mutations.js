export default {
	updateTaxonomyTitle (state, payload) {
		state.liveTags.taxonomy_title = payload
	},
	updateTaxonomyDescription (state, payload) {
		state.liveTags.taxonomy_description = payload
	},
	updatePermalink (state, payload) {
		state.liveTags.permalink = payload
	},
	updatePostTitle (state, payload) {
		state.liveTags.post_title = payload
	},
	updatePostContent (state, payload) {
		state.liveTags.post_content = payload
	},
	updatePostExcerpt (state, payload) {
		state.liveTags.post_excerpt = payload
	},
	updateAttachmentCaption (state, payload) {
		state.liveTags.attachment_caption = payload
	},
	updateAttachmentDescription (state, payload) {
		state.liveTags.attachment_description = payload
	},
	updateAltTag (state, payload) {
		state.liveTags.alt_tag = payload
	},
	updateCategories (state, payload) {
		state.liveTags.categories = payload
	},
	updateWooCommerceBrand (state, payload) {
		state.liveTags.woocommerce_brand = payload
	},
	updateWooCommerceSku (state, payload) {
		state.liveTags.woocommerce_sku = payload
	},
	updateWooCommercePrice (state, payload) {
		state.liveTags.woocommerce_price = payload
	},
	updatePermalinkSlug (state, payload) {
		state.permalinkSlug = payload
	}
}