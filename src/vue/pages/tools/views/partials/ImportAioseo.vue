<template>
	<core-card
		class="aioseo-import-aioseo"
		slug="importAioseoSettings"
		:toggles="false"
		no-slide
		:header-text="strings.importRestoreAioseoSettings"
	>
		<template #header-icon>
			<svg-download />
		</template>

		<core-alert
			v-if="uploadError"
			type="red"
			class="import-error"
		>
			{{ uploadError }}
		</core-alert>

		<core-alert
			v-if="uploadSuccess"
			type="green"
			class="import-error"
		>
			{{ strings.fileUploadedSuccessfully }}
		</core-alert>

		<div class="file-upload">
			<base-input
				v-model="filename"
				size="medium"
				@focus="triggerFileUpload"
				:placeholder="strings.fileUploadPlaceholder"
				:class="{ 'aioseo-error': uploadError }"
			/>
			<base-button
				type="black"
				size="medium"
			>
				{{ strings.chooseAFile }}
				<base-input
					v-model="inputFile"
					type="file"
					@click="reset"
					@change="handleFileUpload"
					ref="file"
				/>
			</base-button>
		</div>

		<div class="aioseo-description">
			{{ strings.fileUploadDescription }}
		</div>

		<base-button
			type="blue"
			size="medium"
			class="import"
			@click="submitFile"
			:disabled="!file || !importValidated"
			:loading="loading"
		>
			{{ strings.import }}
		</base-button>
	</core-card>
</template>

<script>
import { mapActions } from 'vuex'
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'
import CoreCard from '@/vue/components/common/core/Card'
import SvgDownload from '@/vue/components/common/svg/Download'
export default {
	components : {
		CoreAlert,
		CoreCard,
		SvgDownload
	},
	data () {
		return {
			inputFile     : null,
			filename      : null,
			file          : null,
			uploadError   : false,
			uploadSuccess : false,
			loading       : false,
			strings       : {
				importRestoreAioseoSettings : this.$t.sprintf(
					// Translators: 1 - The plugin short name ("AIOSEO").
					this.$t.__('Import / Restore %1$s Settings', this.$td),
					import.meta.env.VITE_SHORT_NAME
				),
				fileUploadPlaceholder    : this.$t.__('Import from a JSON or INI file...', this.$td),
				chooseAFile              : this.$t.__('Choose a File', this.$td),
				fileUploadDescription    : this.$t.__('Imported settings will overwrite existing settings and will not be merged.', this.$td),
				import                   : this.$t.__('Import', this.$td),
				jsonFileTypeRequired     : this.$t.__('A JSON or INI file is required to import settings.', this.$td),
				fileUploadedSuccessfully : this.$t.__('Success! Your settings have been imported.', this.$td),
				fileUploadFailed         : this.$t.__('There was an error importing your settings. Please make sure you are uploading the correct file or it is in the proper format.', this.$td)
			}
		}
	},
	computed : {
		importValidated () {
			if ('application/json' === this.file.type || this.file.name.endsWith('.ini')) {
				return true
			}
			return false
		}
	},
	methods : {
		...mapActions([ 'uploadFile' ]),
		reset () {
			this.uploadError = false
			this.filename    = null
			this.file        = null
			this.inputFile   = null
		},
		triggerFileUpload () {
			this.reset()
			this.$refs.file.$el.querySelector('input').focus()
			this.$refs.file.$el.querySelector('input').click()
		},
		submitFile () {
			this.loading = true
			this.uploadFile({
				file     : this.file,
				filename : this.filename
			})
				.then(() => {
					this.reset()
					this.uploadSuccess = true
					this.loading       = false
				})
				.catch(() => {
					this.reset()
					this.loading     = false
					this.uploadError = this.strings.fileUploadFailed
				})
		},
		handleFileUpload () {
			this.reset()
			this.file = this.$refs.file.$el.querySelector('input').files[0]
			if (this.file) {
				this.filename = this.file.name

				if ('application/json' !== this.file.type && !this.file.name.endsWith('.ini')) {
					this.uploadError = this.strings.jsonFileTypeRequired
				}
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-import-aioseo {
	.import-error {
		margin-bottom: 20px;
	}

	.file-upload {
		display: flex;

		> .aioseo-input {
			margin-right: 10px;
		}
	}

	.aioseo-button.import {
		margin-top: 24px;
	}
}
</style>