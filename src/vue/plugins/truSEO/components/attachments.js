import Vue from 'vue'
import store from '@/vue/store'

// Update post data
export const maybeUpdateAttachment = (run = false) => {
	if ('attachment' !== store.state.currentPost.postType) {
		return
	}

	// Attachment Caption
	const attachmentCaption = document.querySelector('textarea#attachment_caption')
	if (attachmentCaption) {
		store.commit('live-tags/updateAttachmentCaption', attachmentCaption.value)
		attachmentCaption.addEventListener('input', event => {
			store.commit('live-tags/updateAttachmentCaption', event.target.value)
		})
	}

	const postAttachmentCaption = document.querySelector('textarea#attachment-details-caption')
	if (postAttachmentCaption) {
		store.commit('live-tags/updateAttachmentCaption', postAttachmentCaption.value)
		postAttachmentCaption.addEventListener('input', event => {
			store.commit('live-tags/updateAttachmentCaption', event.target.value)
		})
	}

	// Alt Tag
	const altTag = document.querySelector('input#attachment_alt')
	if (altTag) {
		store.commit('live-tags/updateAltTag', altTag.value)
		altTag.addEventListener('input', event => {
			store.commit('live-tags/updateAltTag', event.target.value)
		})
	}
	const postAttachmentAltTag = document.querySelector('input#attachment-details-alt-text')
	if (postAttachmentAltTag) {
		store.commit('live-tags/updateAltTag', altTag.value)
		postAttachmentAltTag.addEventListener('input', event => {
			store.commit('live-tags/updateAltTag', event.target.value)
		})
	}

	if (run) {
		Vue.prototype.$truSEO.runAnalysis({ postId: store.state.currentPost.id })
	}
}