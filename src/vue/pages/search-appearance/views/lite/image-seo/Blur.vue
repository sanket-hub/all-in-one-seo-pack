<template>
	<core-blur>
		<div class="aioseo-sa-image-seo">
			<core-settings-row
				v-if="['caption', 'description'].includes('title')"
				:name="strings.autogenerate"
				align
			>
				<template #content>
					<base-radio-toggle
						name="autogenerate"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.disabled, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.enabled, value: true }
						]"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.attributeFormat"
			>
				<template #content>
					<core-html-tags-editor
						:line-numbers="false"
						single
						:tags-context="tags.title.context"
						:default-tags="tags.title.default"
					>
						<template #tags-description>
							{{ strings.clickToAddTags }}
						</template>
					</core-html-tags-editor>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.stripPunctuation"
				align
			>
				<template #content>
					<base-radio-toggle
						name="stripPunctuation"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.disabled, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.enabled, value: true }
						]"
					/>

					<div class="global-robots-settings aioseo-description">
						<strong>{{ strings.punctuationCharactersToKeep }}</strong>

						<grid-row
							class="settings"
						>
							<grid-column
								v-for="(setting, index) in stripPunctuationSettings"
								:key="index"
								xl="3"
								md="4"
								sm="6"
							>
								<base-checkbox size="medium">
								{{ setting.label }}
								</base-checkbox>
							</grid-column>
						</grid-row>
					</div>
				</template>

			</core-settings-row>

			<core-settings-row
				:name="strings.casing"
				align
			>
				<template #content>
					<base-radio-toggle
						name="casing"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.disabled, value: '', activeClass: 'dark' },
							{ label: casings.lowerCase.label, value: 'lower' },
							{ label: casings.titleCase.label, value: 'title' },
							{ label: casings.sentenceCase.label, value: 'sentence' }
						]"
					/>

					<div
						class="aioseo-description"
					>
						<span>{{strings.casingDescription}}</span><br/>
						<ul class="casing-options">
							<li
								v-for="(casing, index) in casings"
								:key="index"
							>
								<span>{{casing.label}}</span>
								<span>{{casing.description}}</span>
							</li>
						</ul>
					</div>
				</template>
			</core-settings-row>
		</div>
	</core-blur>
</template>

<script>
import BaseCheckbox from '@/vue/components/common/base/Checkbox'
import BaseRadioToggle from '@/vue/components/common/base/RadioToggle'
import CoreBlur from '@/vue/components/common/core/Blur'
import CoreHtmlTagsEditor from '@/vue/components/common/core/HtmlTagsEditor'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'

export default {
	components : {
		BaseCheckbox,
		BaseRadioToggle,
		CoreBlur,
		CoreHtmlTagsEditor,
		CoreSettingsRow,
		GridColumn,
		GridRow
	},
	data () {
		return {
			stripPunctuationSettings : [
				{ value: 'dashes', label: this.$t.__('Dashes (-)', this.$td) },
				{ value: 'underscores', label: this.$t.__('Underscores (_)', this.$td) },
				{ value: 'numbers', label: this.$t.__('Numbers (0-9)', this.$td) },
				{ value: 'plus', label: this.$t.__('Plus (+)', this.$td) },
				{ value: 'apostrophe', label: this.$t.__('Apostrophe (\')', this.$td) },
				{ value: 'pound', label: this.$t.__('Pound (#)', this.$td) },
				{ value: 'ampersand', label: this.$t.__('Ampersand (&)', this.$td) }
			],
			strings : {
				attributeFormat : this.$t.sprintf(
					// Translators: 1 - The type of format ("Title", "Alt Tag", "Caption" or "Description").
					this.$t.__('%1$s Format', this.$td),
					this.$t.__('Title', this.$td)
				),
				clickToAddTags : this.$t.sprintf(
					// Translators: 1 - The name of the image attribute ("Title", "Alt Tag", "Caption" or "Description").
					this.$t.__('Click on the tags below to insert variables into your %1$s attribute.', this.$td),
					this.$t.__('Title', this.$td).toLowerCase()
				),
				stripPunctuation            : this.$t.__('Strip Punctuation', this.$td),
				punctuationCharactersToKeep : this.$t.__('Punctuation Characters to Keep:', this.$td),
				casing                      : this.$t.__('Casing', this.$td),
				casingDescription           : this.$t.__('Choose which casing should be applied to the attribute.', this.$td),
				wordsToStrip                : this.$t.__('Words to Strip', this.$td),
				autogenerate                : this.$t.sprintf(
					// Translators: 1 - The image attribute name ("Caption" or "Description").
					this.$t.__('Autogenerate %1$s on Upload', this.$td),
					this.$t.__('Title', this.$td)
				)
			},
			tags : {
				title : {
					context : 'imageSeoTitle',
					default : [
						'image_title',
						'separator_sa',
						'site_title'
					]
				},
				altTag : {
					context : 'imageSeoAlt',
					default : [
						'alt_tag',
						'separator_sa',
						'site_title'
					]
				},
				caption : {
					context : 'imageSeoCaption',
					default : [
						'attachment_caption',
						'separator_sa',
						'site_title'
					]
				},
				description : {
					context : 'imageSeoDescription',
					default : [
						'attachment_description',
						'separator_sa',
						'site_title'
					]
				}
			},
			casings : {
				lowerCase : {
					label       : this.$t.__('Lower Case', this.$td),
					description : this.$t.__('All letters are converted to lower case (small) letters.', this.$td)
				},
				titleCase : {
					label       : this.$t.__('Title Case', this.$td),
					description : this.$t.__('Major words are capitalized and minor words remain in their original casing.', this.$td)
				},
				sentenceCase : {
					label       : this.$t.__('Sentence Case', this.$td),
					description : this.$t.__('The first word of each sentence starts with a capital.', this.$td)
				}
			}
		}
	},
	props : {
		activeTab : Object
	}
}
</script>