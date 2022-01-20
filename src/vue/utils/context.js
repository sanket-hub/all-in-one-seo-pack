export const isBlockEditor = () => {
	return document.body.classList.contains('block-editor-page') && window.wp.data
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

export const isWooCommerceProduct = () => {
	return (window.aioseo.data.isWooCommerceActive && window.aioseo.currentPost && 'product' === window.aioseo.currentPost.postType)
}