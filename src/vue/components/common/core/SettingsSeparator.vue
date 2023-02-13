<template>
	<grid-row class="aioseo-separators">
		<grid-column
			xs="2"
			sm="1"
			v-if="!showMoreSeparators && hiddenSeparator"
		>
			<div class="active separator">
				{{ decodedCustomSeparator }}
			</div>
		</grid-column>

		<grid-column
			xs="2"
			sm="1"
			v-for="(separator, index) in decodedSeparators"
			:key="index"
		>
			<div
				@click="setSeparator(separator)"
				class="separator"
				:class="{ active: optionsSeparator === separator }"
			>
				{{ separator }}
			</div>
		</grid-column>

		<template
			v-if="showMoreSeparators"
		>
			<grid-column
				xs="2"
				sm="1"
				v-for="(separator, index) in decodedMoreSeparators"
				:key="`m_${index}`"
			>
				<div
					@click="setSeparator(separator)"
					class="separator"
					:class="{ active: optionsSeparator === separator }"
				>
					{{ separator }}
				</div>
			</grid-column>
		</template>

		<grid-column
			:xs="hiddenSeparator ? '3' : '4'"
			v-if="!showMoreSeparators"
		>
			<div class="show-more">
				<a
					@click.prevent="showMoreSeparators = true"
					href="#"
				>
					{{ strings.showMore }}&hellip;
				</a>
			</div>
		</grid-column>

		<grid-column
			v-if="showMoreSeparators"
		>
			<div class="custom-separator">
				{{ strings.custom }}

				<base-input
					:spellcheck="false"
					size="medium"
					v-model="customSeparator"
				/>
			</div>
		</grid-column>

		<grid-column
			v-if="showMoreSeparators"
		>
			<div class="show-more">
				<a
					@click.prevent="showMoreSeparators = false"
					href="#"
				>
					{{ strings.showLess }}&hellip;
				</a>
			</div>
		</grid-column>
	</grid-row>
</template>

<script>
import { decodeHTMLEntities } from '@/vue/utils/helpers'
import { mapActions, mapState } from 'vuex'
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'
export default {
	components : {
		GridColumn,
		GridRow
	},
	props : {
		optionsSeparator : {
			type     : String,
			required : true
		},
		showMoreSlug : {
			type     : String,
			required : true
		}
	},
	data () {
		return {
			strings : {
				custom   : this.$t.__('Custom separator:', this.$td),
				showMore : this.$t.__('Show More', this.$td),
				showLess : this.$t.__('Show Less', this.$td)
			},
			showMoreSeparators : false,
			showMoreInitial    : true,
			customSeparator    : null,
			separators         : [
				'&ndash;',
				'&raquo;',
				'&rsaquo;',
				'&#x2023;',
				'&rarr;',
				'&bull;',
				'&#47;',
				'&#124;'
			],
			moreSeparators : [
				'&#45;',
				'&mdash;',
				'&laquo;',
				'&larr;',
				'&gt;',
				'&ge;',
				'&#92;',
				'&#43;',
				'&#9658;'
			]
		}
	},
	watch : {
		showMoreSeparators (newValue) {
			if (this.showMoreInitial) {
				this.showMoreInitial = false
				return
			}
			this.toggleRadio({ slug: this.showMoreSlug, value: newValue })
		},
		customSeparator (newVal) {
			if (null === newVal) {
				return
			}

			this.$emit('change', newVal)

			if (this.separators.concat(this.moreSeparators).includes(newVal)) {
				this.customSeparator = null
			}
		}
	},
	computed : {
		...mapState([ 'options', 'settings' ]),
		hiddenSeparator () {
			return this.optionsSeparator === this.customSeparator || this.moreSeparators.includes(this.optionsSeparator)
				? this.optionsSeparator
				: null
		},
		decodedSeparators () {
			return this.separators.map(separator => decodeHTMLEntities(separator))
		},
		decodedMoreSeparators () {
			return this.moreSeparators.map(separator => decodeHTMLEntities(separator))
		},
		decodedCustomSeparator () {
			return decodeHTMLEntities(this.hiddenSeparator)
		}
	},
	methods : {
		...mapActions([ 'toggleRadio' ]),
		setSeparator (separator) {
			this.customSeparator = null
			this.$emit('change', separator)
		}
	},
	mounted () {
		this.showMoreSeparators = this.settings.toggledRadio[this.showMoreSlug]
		this.customSeparator    = !this.optionsSeparator.includes(this.separators.concat(this.moreSeparators))
			? this.optionsSeparator
			: null
	}
}
</script>

<style lang="scss">
.aioseo-separators {
	margin-top: -0.5rem;

	.aioseo-col {
		.separator {
			background-color: $background;
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 51px;
			font-weight: 600;
			font-size: 25px;
			border: 1px solid $gray;
			border-radius: 3px;
			cursor: pointer;

			&:hover {
				background-color: darken($background, 5%);
			}

			&.active {
				background-color: $blue;
				border-color: $blue;
				color: #fff;

				&:hover {
					background-color: $blue;
				}
			}
		}

		.show-more {
			height: 100%;
			display: flex;
			align-items: center;

			a {
				color: $placeholder-color;
			}
		}

		.custom-separator {
			margin: 20px 0;
			display: flex;
			align-items: center;

			.aioseo-input {
				margin-left: 10px;
				max-width: 100px;
			}
		}
	}
}
</style>