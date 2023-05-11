<template>
	<ul class="aioseo-analysis-detail">
		<template
			v-for="(keyphrase, index) in analysisItems"
			:key="index"
		>
			<li
				v-if="keyphrase.title"
			>
				<p
					class="title"
					:class="0 === keyphrase.error ? 'toggled' : ''"
				>
					<svg-circle-check width="12" v-if="0 === keyphrase.error" />
					<svg-circle-close width="12" v-if="1 === keyphrase.error" />
					{{ keyphrase.title }}
					<svg-caret
						width="16"
						@click="toggleDescriptionEv"
					/>
				</p>
				<p class="description">{{ keyphrase.description }}</p>
			</li>
		</template>
	</ul>
</template>

<script>
import SvgCaret from '@/vue/components/common/svg/Caret'
import SvgCircleCheck from '@/vue/components/common/svg/circle/Check'
import SvgCircleClose from '@/vue/components/common/svg/circle/Close'
export default {
	components : {
		SvgCaret,
		SvgCircleCheck,
		SvgCircleClose
	},
	props : {
		analysisItems : {
			type : Object
		}
	},
	data () {
		return {
			strings : {
				delete : this.$t.__('Delete', this.$td)
			}
		}
	},
	methods : {
		toggleDescriptionEv (ev) {
			ev.target.parentElement.classList.toggle('toggled')
		}
	}
}
</script>

<style lang="scss">
.aioseo-analysis-detail {
	margin: 0 0 16px;
	padding: 0;
	list-style: none;

	li {
		padding-left: 24px;
		position: relative;
		margin-bottom: 0;
		font-size: 14px;
		line-height: 22px;

		+ li {
			margin-top: 16px;
		}

		p {
			font-size: inherit;
			line-height: inherit;
			margin: 0;
			padding: 0;
		}

		svg {
			position: relative;
			left: 0;
			top: 3px;
			&.aioseo-circle-check {
				color: $green;
			}
			&.aioseo-circle-close {
				color: $red;
			}
			&.aioseo-circle-check,
			&.aioseo-circle-close {
				position: absolute;
				left: 0;
				top: 5px;
			}
			&.aioseo-caret {
				cursor: pointer;
				transform: rotate(-180deg);
				transition: transform 0.3s;
			}
		}

		.title {
			font-size: 14px;
			margin-bottom: 6px !important;

			&.toggled {

				.aioseo-caret {
					transform: rotate(-90deg)
				}

				&+ .description {
					opacity: 0;
					height: 0;
					margin: 0;
				}
			}
		}

		.description {
			font-size: 14px;
			font-style: normal;
			opacity: 1;
			height: auto;
			transition: all 0.3s;
		}
	}
}

.edit-post-sidebar {
	.aioseo-analysis-detail {

		.description {
			color: $gray3;
		}
	}
}
</style>