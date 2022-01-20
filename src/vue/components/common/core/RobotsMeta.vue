<template>
	<div class="aioseo-robots-meta">
		<base-toggle
			v-model="options.default"
		>
			{{ strings.useDefaultSettings }}
		</base-toggle>

		<div
			v-if="!options.default"
			class="global-robots-settings aioseo-description"
		>
			{{ strings.robotsMeta }}
			<grid-row
				class="settings"
			>
				<grid-column
					v-for="(setting, index) in robotsSettings"
					:key="index"
					xl="3"
					md="4"
					sm="6"
				>
					<base-checkbox
						size="medium"
						v-model="options[setting.value]"
					>
						{{ setting.label }}
					</base-checkbox>
				</grid-column>
			</grid-row>

			<div class="global-robots-settings-options">
				<div
					v-if="!options.nosnippet"
					class="max-snippet aioseo-description"
				>
					{{ strings.maxSnippet }}
					<base-input
						type="number"
						size="medium"
						v-model="options.maxSnippet"
					/>
				</div>

				<div
					class="max-video-preview aioseo-description"
				>
					{{ strings.maxVideoPreview }}
					<base-input
						type="number"
						size="medium"
						v-model="options.maxVideoPreview"
					/>
				</div>

				<div
					v-if="!options.noimageindex"
					class="max-image-preview aioseo-description"
				>
					{{ strings.maxImagePreview }}
					<base-select
						size="medium"
						:options="imagePreviewOptions"
						:value="getImagePreviewOption(options.maxImagePreview)"
						@input="value => options.maxImagePreview = value.value"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props : {
		options : {
			type     : Object,
			required : true
		},
		mainOptions : Object,
		global      : Boolean
	},
	data () {
		return {
			settings : [
				{ value: 'noindex', label: this.$t.__('No Index', this.$td) },
				{ value: 'nofollow', label: this.$t.__('No Follow', this.$td) },
				{ value: 'noarchive', label: this.$t.__('No Archive', this.$td) },
				{ value: 'notranslate', label: this.$t.__('No Translate', this.$td) },
				{ value: 'noimageindex', label: this.$t.__('No Image Index', this.$td) },
				{ value: 'nosnippet', label: this.$t.__('No Snippet', this.$td) },
				{ value: 'noodp', label: this.$t.__('No ODP', this.$td) }
			],
			globalSettings : [
				{ value: 'noindexPaginated', label: this.$t.__('No Index Paginated', this.$td) },
				{ value: 'nofollowPaginated', label: this.$t.__('No Follow Paginated', this.$td) },
				{ value: 'noindexFeed', label: this.$t.__('No Index RSS Feeds', this.$td) }
			],
			strings : {
				useDefaultSettings : this.$t.__('Use Default Settings', this.$td),
				robotsMeta         : this.$t.__('Robots meta:', this.$td),
				maxSnippet         : this.$t.__('Max Snippet', this.$td),
				maxVideoPreview    : this.$t.__('Max Video Preview', this.$td),
				maxImagePreview    : this.$t.__('Max Image Preview', this.$td),
				standard           : this.$t.__('Standard', this.$td),
				none               : this.$t.__('None', this.$td),
				large              : this.$t.__('Large', this.$td)
			}
		}
	},
	watch : {
		noindex (newVal) {
			if (this.mainOptions) {
				this.mainOptions.show = !newVal
			}
		},
		default (newVal) {
			if (!this.mainOptions) {
				return
			}

			if (newVal) {
				this.mainOptions.show = true
			} else {
				this.mainOptions.show = !this.noindex
			}
		}
	},
	computed : {
		robotsSettings () {
			return this.global ? this.settings.concat(this.globalSettings) : this.settings
		},
		noindex () {
			return this.options.noindex
		},
		default () {
			return this.options.default
		},
		imagePreviewOptions () {
			return [
				{ label: this.strings.none, value: 'none' },
				{ label: this.strings.standard, value: 'standard' },
				{ label: this.strings.large, value: 'large' }
			]
		}
	},
	methods : {
		getImagePreviewOption (option) {
			return this.imagePreviewOptions.find(o => o.value === option)
		}
	}
}
</script>

<style lang="scss">
.aioseo-robots-meta {
	.global-robots-settings-options {
		display: flex;

		.max-snippet {
			margin-right: 30px;

			.aioseo-input {
				max-width: 90px;
			}
		}

		.max-video-preview {
			margin-right: 30px;

			.aioseo-input {
				max-width: 90px;
			}
		}

		.max-image-preview {
			.aioseo-select {
				min-width: 155px;
			}
		}

		@media screen and (max-width: 782px) {
			display: block;

			.max-snippet,
			.max-video-preview {
				margin-right: 0;
				margin-bottom: 20px;
			}

			> div {

				.aioseo-input,
				.aioseo-select {
					min-width: 100%;
				}
			}
		}
	}
}
</style>