export default {
	methods : {
		redirectHasUnPublishedPost (redirect) {
			return redirect.post_id && 'publish' !== redirect.postStatus
		}
	}
}