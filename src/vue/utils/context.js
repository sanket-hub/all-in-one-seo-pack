if (!window.wp.blockEditor && window.wp.blocks && window.wp.oldEditor) {
	window.wp.blockEditor = window.wp.editor
}

export const isBlockEditor = () => {
	return document.body.classList.contains('block-editor-page') && window.wp.data && canLoadBlocks()
}

export const isClassicEditor = () => {
	if (document.querySelector('#wp-content-wrap.tmce-active')) {
		return true
	}
	if (document.querySelector('#wp-content-wrap.html-active')) {
		return true
	}
	return false
}

export const isElementorEditor = () => {
	if (document.body.classList.contains('elementor-editor-active') && window.elementor) {
		return true
	}

	return false
}

export const isDiviEditor = () => {
	if (document.body.classList.contains('et_pb_pagebuilder_layout') && window.ET_Builder) {
		return true
	}

	return false
}

export const isSeedProdEditor = () => {
	if (document.body.classList.contains('seedprod-builder') && window.seedprod_data) {
		return true
	}

	return false
}

export const isWooCommerceProduct = () => {
	return (window.aioseo.data.isWooCommerceActive && window.aioseo.currentPost && 'product' === window.aioseo.currentPost.postType)
}

export const canLoadBlocks = () => {
	const wp = window.wp
	return ('undefined' !== typeof wp && 'undefined' !== typeof wp.blocks && 'undefined' !== typeof wp.blockEditor)
}