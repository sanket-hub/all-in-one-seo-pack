<template>
	<div>
		<link-assistant
			v-if="shouldShowMain || isUnlicensed"
			:links="links"
		/>

		<activate
			v-if="shouldShowActivate"
		/>

		<update
			v-if="shouldShowUpdate"
		/>

		<upgrade
			v-if="$addons.requiresUpgrade(addonSlug)"
		/>
	</div>
</template>

<script>
import Activate from './link-assistant/Activate'
import LinkAssistant from './link-assistant/LinkAssistant'
import Update from './link-assistant/Update'
import Upgrade from './link-assistant/Upgrade'
import { AddonConditions } from '@/vue/mixins'
export default {
	mixins : [ AddonConditions ],
	props  : {
		links : Object
	},
	components : {
		Activate,
		LinkAssistant,
		Update,
		Upgrade
	},
	data () {
		return {
			addonSlug : 'aioseo-link-assistant'
		}
	}
}
</script>

<style lang="scss">
.aioseo-app .aioseo-search-statistics-link-assistant {
	font-size: 14px;

	.aioseo-cta {
		.aioseo-cta-background {
			.header-text {
				font-size: 15px;
			}

			.description {
				font-size: 14px;
			}
		}
	}
}
</style>