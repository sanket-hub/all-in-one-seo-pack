<template>
	<core-main
		:page-name="strings.pageName"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
import AccessControl from './AccessControl'
import Advanced from './Advanced'
import Breadcrumbs from './Breadcrumbs'
import CoreMain from '@/vue/components/common/core/main/Index.vue'
import GeneralSettings from './GeneralSettings'
import RssContent from './RssContent'
import WebmasterTools from './WebmasterTools'
export default {
	components : {
		AccessControl,
		Advanced,
		Breadcrumbs,
		CoreMain,
		GeneralSettings,
		RssContent,
		WebmasterTools
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('General Settings', this.$td)
			}
		}
	}
}
</script>