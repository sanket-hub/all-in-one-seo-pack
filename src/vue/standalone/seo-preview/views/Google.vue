<template>
	<div class="preview-wrapper">
		<core-google-search-preview
			:description="googleData.description"
			:domain="googleData.domain"
			:title="googleData.title"
		/>
	</div>
</template>

<script>
import { getGoogleSnippetData } from '@/vue/utils/html'
import CoreGoogleSearchPreview from '@/vue/components/common/core/GoogleSearchPreview'

export default {
	components : {
		CoreGoogleSearchPreview
	},
	data () {
		return {
			googleData : getGoogleSnippetData()
		}
	}
}
</script>