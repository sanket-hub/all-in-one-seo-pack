import { mapGetters } from 'vuex'
export const AccessControl = {
	data () {
		return {
			roles : [
				'administrator',
				'editor',
				'author',
				'seoManager',
				'seoEditor'
			],
			strings : {
				// Translators: 1 - The plugin name ("All in One SEO")
				tooltip                  : this.$t.sprintf(this.$t.__('By default, only users with an Administrator role have permission to manage %1$s within your WordPress admin area. With Access Controls, though, you can easily extend specific access permissions to other user roles.', this.$td), process.env.VUE_APP_NAME),
				accessControl            : this.$t.__('Access Control Settings', this.$td),
				administrator            : this.$t.__('Administrator', this.$td),
				useDefaultSettings       : this.$t.__('Use Default Settings', this.$td),
				editor                   : this.$t.__('Editor', this.$td),
				author                   : this.$t.__('Author', this.$td),
				seoManager               : this.$t.__('SEO Manager', this.$td),
				seoEditor                : this.$t.__('SEO Editor', this.$td),
				// Translators: 1 - Opening HTML bold tag, 2 - Closing HTML bold tag.
				administratorDescription : this.$t.sprintf(this.$t.__('By default Admins have access to %1$sall SEO site settings%2$s', this.$td), '<strong>', '</strong>'),
				// Translators: 1 - Opening HTML bold tag, 2 - Closing HTML bold tag.
				editorDescription        : this.$t.sprintf(this.$t.__('By default Editors have access to %1$sSEO settings for General Settings, Search Appearance and Social Networks, as well as all settings for individual pages and posts.%2$s', this.$td), '<strong>', '</strong>'),
				// Translators: 1 - Opening HTML bold tag, 2 - Closing HTML bold tag.
				authorDescription        : this.$t.sprintf(this.$t.__('By default Authors have access to %1$sSEO settings for individual pages and posts that they already have permission to edit.%2$s', this.$td), '<strong>', '</strong>'),
				// Translators: 1 - Opening HTML bold tag, 2 - Closing HTML bold tag.
				seoManagerDescription    : this.$t.sprintf(this.$t.__('By default SEO Managers have access to %1$sSEO settings for General Settings, Redirections, and individual pages and posts.%2$s', this.$td), '<strong>', '</strong>'),
				// Translators: 1 - Opening HTML bold tag, 2 - Closing HTML bold tag.
				seoEditorDescription     : this.$t.sprintf(this.$t.__('By default SEO Editors have access to %1$sSEO settings for individual pages and posts.%2$s', this.$td), '<strong>', '</strong>')
			}
		}
	},
	computed : {
		...mapGetters([ 'settings' ])
	}
}