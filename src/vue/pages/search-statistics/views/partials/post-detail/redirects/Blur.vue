<template>
	<core-blur>
		<redirects :redirects="redirects" />
		<br><br><br>
	</core-blur>
</template>

<script>
import CoreBlur from '@/vue/components/common/core/Blur'
import Redirects from './Redirects'
export default {
	components : {
		CoreBlur,
		Redirects
	},
	computed : {
		redirects () {
			const from = [
				this.$links.docLinks.home,
				this.$links.docLinks.googleSearchConsole,
				this.$links.docLinks.googleAnalytics
			]

			return { from }
		}
	}
}
</script>