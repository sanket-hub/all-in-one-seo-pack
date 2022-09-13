<template>
	<core-modal-portal
		:classes="[ 'aioseo-toc-modal-lite' ]"
		@close="$emit('closeModal')"
	>
		<template #body >
			<cta
				:type="1"
				:floating="false"
				:cta-link="$links.utmUrl('toc-block')"
				:button-text="'Upgrade to Pro and Unlock Reordering'"
				:learn-more-link="$links.getUpsellUrl('toc-block', null, 'reorder-modal')"
			>
				<template #header-text>
					{{strings.header}}
				</template>

				<template #description>
					{{strings.description}}
				</template>
			</cta>
		</template>
	</core-modal-portal>
</template>

<script>
import CoreModalPortal from '@/vue/components/common/core/modal/Portal'
import Cta from '@/vue/components/common/cta/Index.vue'

const { __, sprintf } = window.wp.i18n
const td              = import.meta.env.VITE_TEXTDOMAIN
export default {
	components : {
		CoreModalPortal,
		Cta
	},
	data () {
		return {
			strings : {
				header : sprintf(
					// Translators: The short plugin name ("AIOSEO Pro").
					__('This feature is available only for %1$s users', td),
					import.meta.env.VITE_SHORT_NAME + ' Pro'
				),
				description : __('Reordering the headings in the Table of Contents block is a feature that can only be used by Pro users. Upgrade to Pro to unlock this advanced functionality.', td)
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-toc-modal-lite {
	.aioseo-cta {
		border: none;
		box-shadow: none;
	}

	.modal-mask .modal-wrapper .modal-container .modal-header {
		height: 0;
		border: none;
	}
}
</style>