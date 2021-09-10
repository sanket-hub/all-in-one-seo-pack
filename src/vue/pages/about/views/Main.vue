<template>
	<core-main
		:page-name="strings.pageName"
		:showSaveButton="false"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
import AboutUs from './AboutUs'
import GettingStarted from './GettingStarted'
import LiteVsPro from './AIOSEO_VERSION/LiteVsPro'
export default {
	components : {
		AboutUs,
		GettingStarted,
		LiteVsPro
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('About', this.$td)
			}
		}
	}
}
</script>