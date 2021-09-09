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
import Maps from './Maps'
export default {
	components : {
		Locations,
		OpeningHours,
		Maps
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