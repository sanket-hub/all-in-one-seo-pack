<template>
	<core-main
		:page-name="strings.pageName"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
import Overview from './Overview'
import LinksReport from './LinksReport'
import DomainReport from './DomainReport'
import Settings from './Settings'
export default {
	components : {
		Overview,
		LinksReport,
		DomainReport,
		Settings
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('Internal Links', this.$td)
			}
		}
	}
}
</script>