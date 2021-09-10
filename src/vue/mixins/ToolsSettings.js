import { mapGetters, mapState } from 'vuex'

export const ToolsSettings = {
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'addons' ]),
		toolsSettings () {
			const settings = [
				{
					value  : 'webmasterTools',
					label  : this.$t.__('Webmaster Tools', this.$td),
					access : 'aioseo_general_settings'
				},
				{
					value  : 'rssContent',
					label  : this.$t.__('RSS Content', this.$td),
					access : 'aioseo_general_settings'
				},
				{
					value  : 'advanced',
					label  : this.$t.__('Advanced', this.$td),
					access : 'aioseo_general_settings'
				},
				{
					value  : 'searchAppearance',
					label  : this.$t.__('Search Appearance', this.$td),
					access : 'aioseo_search_appearance_settings'
				},
				{
					value  : 'social',
					label  : this.$t.__('Social Networks', this.$td),
					access : 'aioseo_social_networks_settings'
				},
				{
					value  : 'sitemap',
					label  : this.$t.__('Sitemaps', this.$td),
					access : 'aioseo_sitemap_settings'
				},
				{
					value  : 'robots',
					label  : this.$t.__('Robots.txt', this.$td),
					access : 'aioseo_tools_settings'
				},
				{
					value  : 'breadcrumbs',
					label  : this.$t.__('Breadcrumbs', this.$td),
					access : 'aioseo_general_settings'
				}
			]

			if (window.aioseo.internalOptions.internal.deprecatedOptions.includes('badBotBlocker')) {
				settings.push({
					value  : 'blocker',
					label  : this.$t.__('Bad Bot Blocker', this.$td),
					access : 'aioseo_tools_settings'
				})
			}

			// if (this.$aioseo.data.server.apache) {
			//  settings.push({ value: 'htaccess', label: this.$t.__('.htaccess', this.$td) })
			// }

			if (this.$isPro) {
				settings.push({
					value  : 'accessControl',
					label  : this.$t.__('Access Control', this.$td),
					access : 'aioseo_admin'
				})
			}

			if (!this.isUnlicensed && this.showImageSeoReset) {
				settings.push({
					value  : 'image',
					label  : this.$t.__('Image SEO', this.$td),
					access : 'aioseo_search_appearance_settings'
				})
			}

			if (!this.isUnlicensed && this.showLocalBusinessReset) {
				settings.push({
					value  : 'localBusiness',
					label  : this.$t.__('Local Business SEO', this.$td),
					access : 'aioseo_local_seo_settings'
				})
			}

			if (!this.isUnlicensed && this.showRedirectsReset) {
				settings.push({
					value  : 'redirects',
					label  : this.$t.__('Redirects', this.$td),
					access : 'aioseo_redirects_settings'
				})
			}

			return settings.filter(setting => this.$allowed(setting.access))
		},
		showImageSeoReset () {
			const addon = this.addons.find(item => 'aioseo-image-seo' === item.sku)
			return addon && addon.isActive && !addon.requiresUpgrade
		},
		showLocalBusinessReset () {
			const addon = this.addons.find(item => 'aioseo-local-business' === item.sku)
			return addon && addon.isActive && !addon.requiresUpgrade
		},
		showRedirectsReset () {
			const addon = this.addons.find(item => 'aioseo-redirects' === item.sku)
			return addon && addon.isActive && !addon.requiresUpgrade
		}
	}
}