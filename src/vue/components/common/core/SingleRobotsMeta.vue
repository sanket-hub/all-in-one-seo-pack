<template>
	<div class="aioseo-robots-meta">
		<base-toggle
			v-model="currentPost.default"
			@input="setIsDirty"
		>
			{{ strings.useDefaultSettings }}
		</base-toggle>

		<div
			v-if="!currentPost.default"
			class="global-robots-settings aioseo-description"
		>
			<span class="robots-meta-title">{{ strings.robotsMeta }}</span>
			<grid-row
				class="settings"
			>
				<grid-column
					xl="3"
					md="4"
					sm="6"
				>
					<base-checkbox
						size="medium"
						v-model="currentPost.noindex"
						@input="setIsDirty"
					>
						{{ strings.noindex }}
					</base-checkbox>
				</grid-column>
				<grid-column
					xl="3"
					md="4"
					sm="6"
				>
					<base-checkbox
						size="medium"
						v-model="currentPost.nofollow"
						@input="setIsDirty"
					>
						{{ strings.nofollow }}
					</base-checkbox>
				</grid-column>
				<grid-column
					xl="3"
					md="4"
					sm="6"
				>
					<base-checkbox
						size="medium"
						v-model="currentPost.noarchive"
						@input="setIsDirty"
					>
						{{ strings.noarchive }}
					</base-checkbox>
				</grid-column>
				<grid-column
					xl="3"
					md="4"
					sm="6"
				>
					<base-checkbox
						size="medium"
						v-model="currentPost.notranslate"
						@input="setIsDirty"
					>
						{{ strings.notranslate }}
					</base-checkbox>
				</grid-column>
				<grid-column
					xl="3"
					md="4"
					sm="6"
				>
					<base-checkbox
						size="medium"
						v-model="currentPost.noimageindex"
						@input="setIsDirty"
					>
						{{ strings.noimageindex }}
					</base-checkbox>
				</grid-column>
				<grid-column
					xl="3"
					md="4"
					sm="6"
				>
				<base-checkbox
						size="medium"
						v-model="currentPost.nosnippet"
						@input="setIsDirty"
					>
						{{ strings.nosnippet }}
					</base-checkbox>
				</grid-column>
				<grid-column
					xl="3"
					md="4"
					sm="6"
				>
					<base-checkbox
						size="medium"
						v-model="currentPost.noodp"
						@input="setIsDirty"
					>
						{{ strings.noodp }}
					</base-checkbox>
				</grid-column>
			</grid-row>

			<div class="global-robots-settings-options">
				<div
					v-if="!currentPost.nosnippet"
					class="aioseo-description max-snippet"
				>
					<span>{{ strings.maxSnippet }}</span>
					<base-input
						type="number"
						size="medium"
						v-model="currentPost.maxSnippet"
						@input="setIsDirty"
					/>
				</div>

				<div
					class="aioseo-description max-video-preview"
				>
					<span>{{ strings.maxVideoPreview }}</span>
					<base-input
						type="number"
						size="medium"
						v-model="currentPost.maxVideoPreview"
						@input="setIsDirty"
					/>
				</div>

				<div
					v-if="!currentPost.noimageindex"
					class="aioseo-description max-image-preview"
				>
					<span>{{ strings.maxImagePreview }}</span>
					<base-select
						size="medium"
						:options="imagePreviewOptions"
						:value="getImagePreview(currentPost.maxImagePreview)"
						@input="value => saveImagePreview(value.value)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { IsDirty } from '@/vue/mixins'
import BaseCheckbox from '@/vue/components/common/base/Checkbox'
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'
export default {
	components : {
		BaseCheckbox,
		GridColumn,
		GridRow
	},
	mixins : [ IsDirty ],
	data () {
		return {
			strings : {
				useDefaultSettings : this.$t.__('Use Default Settings', this.$td),
				robotsMeta         : this.$t.__('Robots meta:', this.$td),
				maxSnippet         : this.$t.__('Max Snippet', this.$td),
				maxVideoPreview    : this.$t.__('Max Video Preview', this.$td),
				maxImagePreview    : this.$t.__('Max Image Preview', this.$td),
				standard           : this.$t.__('Standard', this.$td),
				none               : this.$t.__('None', this.$td),
				large              : this.$t.__('Large', this.$td),
				noindex            : this.$t.__('No Index', this.$td),
				nofollow           : this.$t.__('No Follow', this.$td),
				noarchive          : this.$t.__('No Archive', this.$td),
				notranslate        : this.$t.__('No Translate', this.$td),
				noimageindex       : this.$t.__('No Image Index', this.$td),
				nosnippet          : this.$t.__('No Snippet', this.$td),
				noodp              : this.$t.__('No ODP', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'currentPost' ]),
		imagePreviewOptions () {
			return [
				{ label: this.strings.none, value: 'none' },
				{ label: this.strings.standard, value: 'standard' },
				{ label: this.strings.large, value: 'large' }
			]
		}
	},
	methods : {
		getImagePreview (option) {
			return this.imagePreviewOptions.find(h => h.value === option)
		},
		saveImagePreview (value) {
			this.$set(this.currentPost, 'maxImagePreview', value)
			this.$store.commit('isDirty', true)
		}
	}
}
</script>

<style lang="scss">
.aioseo-robots-meta {
	.global-robots-settings {
		margin: 0;
		padding-top: 24px;
		> .settings {
			padding: 8px 0 16px;
		}
	}
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

		> span {
			display: inline-block;
			margin-bottom: 4px;
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
.edit-post-sidebar {
	.global-robots-settings {
		padding-top: 12px;
		> .settings {
			padding: 4px 0 12px;
			label {
				font-size: 16px;
			}
		}
		.robots-meta-title {
			padding-top: 4px;
			display: inline-block;
		}
	}
	.global-robots-settings-options {
		flex-wrap: wrap;
	}
	.max-snippet {
		margin-right: 30px !important;
	}
	.max-video-preview {
		margin-right: 0 !important;
	}
	.max-image-preview {
		margin-top: 20px !important;
	}
}
</style>