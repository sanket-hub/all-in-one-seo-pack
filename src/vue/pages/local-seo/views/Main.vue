<template>
	<core-main
		:page-name="strings.pageName"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
import '@/vue/components/AIOSEO_VERSION'
import Locations from './Locations'
import OpeningHours from './OpeningHours'
export default {
	components : {
		Locations,
		OpeningHours
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('Local SEO', this.$td)
			}
		}
	}
}
</script>