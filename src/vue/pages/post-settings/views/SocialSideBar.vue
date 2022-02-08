<template>
	<core-settings-row
		:name="strings.metaDescription"
		v-if="'sidebar' === $root._data.screenContext"
		class="snippet-description-row open-social-copy"
	>
		<template #content>
			<p>{{ strings.sidebarCopy }}</p>
			<base-button
				class="open-social-modal gray small"
				@click="openModalEv"
			>
				<svg-pencil />
				{{ strings.editSnippet }}
			</base-button>
		</template>
	</core-settings-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	data () {
		return {
			strings : {
				sidebarCopy : this.$t.__('Here you can view and edit the thumbnail, title and description that will be displayed when your site is shared on social media. Click on the button below to view and edit the preview.', this.$td),
				editSnippet : this.$t.__('Preview & Edit', this.$td)
			}
		}
	},
	methods : {
		...mapActions([ 'openModal' ]),
		openModalEv () {
			this.$store.commit('changeTabSettings', { setting: 'tab_modal', value: 'social' })
			this.openModal(true)
		}
	}
}
</script>

<style lang="scss">
	.open-social-modal {
		margin: 12px 0 12px 0;
		border: 1px solid $gray;
		svg {
			margin-right: 5px;
		}
	}
	.open-social-copy > .col-md-3 {
		display: none;
	}
</style>