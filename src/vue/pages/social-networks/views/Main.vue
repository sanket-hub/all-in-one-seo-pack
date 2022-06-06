<template>
	<core-main
		:page-name="strings.pageName"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
import CoreMain from '@/vue/components/common/core/main/Index.vue'
import Facebook from './Facebook'
import Pinterest from './Pinterest'
import SocialProfiles from './SocialProfiles'
import Twitter from './Twitter'
export default {
	components : {
		CoreMain,
		Facebook,
		Pinterest,
		SocialProfiles,
		Twitter
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('Social Networks', this.$td)
			}
		}
	}
}
</script>