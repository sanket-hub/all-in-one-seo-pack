<template>
	<div class="aioseo-search-appearance-taxonomies">
		<core-card
			v-for="(taxonomy, index) in taxonomies"
			:key="index"
			:slug="`${taxonomy.name}SA`"
		>
			<template #header>
				<div
					class="icon dashicons"
					:class="`${taxonomy.icon || 'dashicons-admin-post'}`"
				/>
				<div>
					{{ taxonomy.label }}
				</div>
			</template>

			<template
				#tabs
			>
				<core-main-tabs
					:tabs="tabs"
					:showSaveButton="false"
					:active="settings.internalTabs[`${taxonomy.name}SA`]"
					internal
					@changed="value => processChangeTab(taxonomy.name, value)"
				/>
			</template>

			<transition
				name="route-fade" mode="out-in"
			>
				<component
					:is="settings.internalTabs[`${taxonomy.name}SA`]"
					:object="taxonomy"
					:separator="options.searchAppearance.global.separator"
					:options="options.searchAppearance.dynamic.taxonomies[taxonomy.name]"
					type="taxonomies"
					:show-bulk="false"
				/>
			</transition>
		</core-card>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Advanced from './partials/Advanced'
import TitleDescription from './partials/TitleDescription'
export default {
	components : {
		Advanced,
		TitleDescription
	},
	data () {
		return {
			internalDebounce : null,
			strings          : {
				ctaButtonText  : this.$t.__('Upgrade to Pro and Unlock Custom Taxonomies', this.$td),
				// Translators: 1 - The plugin short name ("AIOSEO"), 2 - "Pro".
				ctaDescription : this.$t.sprintf(this.$t.__('%1$s %2$s lets you set the SEO title and description for custom taxonomies. You can also control all of the robots meta and other options just like the default category and tags taxonomies.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro'),
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeader      : this.$t.sprintf(this.$t.__('Custom Taxonomy Support is only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro')
			},
			tabs : [
				{
					slug   : 'title-description',
					name   : this.$t.__('Title & Description', this.$tdPro),
					access : 'aioseo_search_appearance_settings',
					pro    : false
				},
				{
					slug   : 'advanced',
					name   : this.$t.__('Advanced', this.$tdPro),
					access : 'aioseo_search_appearance_settings',
					pro    : false
				}
			]
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'options', 'settings' ]),
		taxonomies () {
			return this.$aioseo.postData.taxonomies
		}
	},
	methods : {
		...mapActions([ 'changeTab' ]),
		processChangeTab (taxonomy, value) {
			if (this.internalDebounce) {
				return
			}

			this.internalDebounce = true
			this.changeTab({ slug: `${taxonomy}SA`, value })

			// Debouncing a little here to save extra API calls. @TODO: [V4+] Figure out why this gets hit twice?
			setTimeout(() => {
				this.internalDebounce = false
			}, 50)
		}
	}
}
</script>

<style lang="scss">
.aioseo-search-appearance-taxonomies {
	.icon {
		display: flex;
		align-items: center;
		margin-right: 16px;
	}
}
</style>