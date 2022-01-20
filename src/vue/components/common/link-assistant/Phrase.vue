<template>
	<div
		class="aioseo-link-assistant-phrase"
		@mouseover="$emit('mouseOver')"
		@mouseleave="$emit('mouseLeave')"
	>
		<span class="phrase">
			<span class="first">{{ firstPart }}</span>

			<core-tooltip
				v-if="tooltip"
				type="action"
			>
				<span
					class="anchor"
					@click="maybeOpenLink"
				>{{ linkAnchor }}</span>

				<template #tooltip>
					<a class="tooltip-url" :href="url" target="_blank">{{ url }}</a>
				</template>
			</core-tooltip>

			<div v-if="!tooltip">
				<span class="anchor">{{ linkAnchor }}</span>
			</div>

			<span class="last">{{ lastPart }}</span>
		</span>

		<slot name="icons" />
	</div>
</template>

<script>
import { escapeRegex } from '@/vue/utils/regex'

export default {
	props : {
		phrase : {
			type     : String,
			required : true
		},
		phraseHtml : {
			type     : String,
			required : true
		},
		anchor : {
			type     : String,
			required : true
		},
		url : {
			type     : String,
			required : true
		},
		tooltip : {
			type     : Boolean,
			required : false,
			default  : true
		},
		clickableAnchor : {
			type : Boolean,
			default () {
				return false
			}
		}

	},
	computed : {
		partPattern () {
			const escapedAnchor = escapeRegex(this.anchor)
			return new RegExp(`(.*)(<t?a[^>]*>.*${escapedAnchor}.*</t?a>)(.*)`, 'i')
		},
		firstPart () {
			return this.stripTags(this.getPart(1))
		},
		linkAnchor () {
			// Returns the anchor, but with the right casing (the value on the model is always lowercase).
			return this.stripTags(this.getPart(2))
		},
		lastPart () {
			return this.stripTags(this.getPart(3))
		}
	},
	methods : {
		getPart (groupIndex) {
			const matches = this.phraseHtml.match(this.partPattern)
			if (!matches) {
				return ''
			}
			return matches[groupIndex]
		},
		stripTags (string) {
			return string.replace(/(<([^>]+)>)/gi, '')
		},
		maybeOpenLink () {
			if (this.clickableAnchor) {
				window.open(this.url, '_blank').focus()
			}
		}
	}
}
</script>

<style lang="scss">
	.aioseo-app .aioseo-link-assistant-phrase {
		.aioseo-tooltip {
			display: inline !important;
			margin: 0;
			font-size: 0px;
			line-height: 100%;

			span {
				font-size: 14px;
			}

			.anchor {
				text-decoration: underline;
				color: $blue;
				white-space: normal;

				&:hover {
					cursor: pointer;
				}
			}

			a.tooltip-url {
				text-decoration: underline;
				color: white;

				&:hover {
					text-decoration: none;
				}
			}
		}

		.icons {
			margin-left: 10px;
		}
	}
</style>