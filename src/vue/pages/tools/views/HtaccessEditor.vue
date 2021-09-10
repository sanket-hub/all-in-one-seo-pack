<template>
	<div class="aioseo-tools-htaccess-editor">
		<core-card
			slug="htaccessEditor"
			:header-text="strings.htaccessEditor"
		>
			<div class="aioseo-settings-row aioseo-section-description"
				v-html="strings.description"
			/>

			<core-settings-row
				:name="strings.editHtaccess"
				align
			>
				<template #content>
					<core-alert
						v-if="htaccessError"
						type="red"
					>
						{{ htaccessError }}
					</core-alert>
					<base-editor
						class="htaccess-editor"
						:disabled="!$aioseo.user.unfilteredHtml"
						v-model="$aioseo.data.htaccess"
						line-numbers
						monospace
					/>
				</template>
			</core-settings-row>
		</core-card>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data () {
		return {
			strings : {
				htaccessEditor : this.$t.__('.htaccess Editor', this.$td),
				editHtaccess   : this.$t.__('Edit .htaccess', this.$td),
				// Translators: 1 - Opening bold tag, 2 - Closing bold tag.
				description    : this.$t.sprintf(this.$t.__('This allows you to edit the .htaccess file for your site.  All WordPress sites on an Apache server have a .htaccess file and we have provided you with a convenient way of editing it. Care should always be taken when editing important files from within WordPress as an incorrect change could cause WordPress to become inaccessible. %1$sBe sure to make a backup before making changes and ensure that you have FTP access to your web server and know how to access and edit files via FTP.%2$s', this.$td), '<strong>', '</strong>')
			}
		}
	},
	computed : {
		...mapState([ 'htaccessError' ])
	}
}
</script>

<style lang="scss">
.aioseo-tools-htaccess-editor {
	.aioseo-alert {
		margin-bottom: 20px;
	}

	.htaccess-editor {
		margin-top: 10px;
	}
}
</style>