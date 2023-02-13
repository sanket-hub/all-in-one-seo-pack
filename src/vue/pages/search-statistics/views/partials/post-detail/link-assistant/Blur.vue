<template>
	<core-blur>
		<link-assistant :links="links" />
		<br><br><br><br><br><br><br><br><br><br>
	</core-blur>
</template>

<script>
import CoreBlur from '@/vue/components/common/core/Blur'
import LinkAssistant from './LinkAssistant'
export default {
	components : {
		CoreBlur,
		LinkAssistant
	},
	data () {
		return {
			strings : {
				title : this.$t.__('3 posts are redirecting to this post', this.$td)
			}
		}
	},
	computed : {
		links () {
			return {}
		}
	}
}
</script>