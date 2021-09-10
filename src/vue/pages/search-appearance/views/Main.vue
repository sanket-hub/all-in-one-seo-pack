<template>
	<core-main
		:page-name="strings.pageName"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
// @NOTE: It's important to leave these importing in this order as it
// prevents the compiler from throwing errors with mini-css-extract-plugin.
import GlobalSettings from './GlobalSettings'
import ContentTypes from './ContentTypes'
import Media from './Media'
import Taxonomies from './Taxonomies'
import Archives from './Archives'
import Advanced from './Advanced'
export default {
	components : {
		Advanced,
		Archives,
		ContentTypes,
		GlobalSettings,
		Media,
		Taxonomies
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('Search Appearance', this.$td)
			}
		}
	}
}
</script>