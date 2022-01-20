<template>
	<div class="aioseo-headline-result">
		<div class="box box--large">
			<div class="box-title">{{ strings.wordBalance }}</div>
			<div class="box-icon">
				<component
					:is="wordBalance.icon"
					:class="wordBalance.class"
				/>
			</div>
			<strong
				class="box-result"
				:class="wordBalance.class"
			>
				{{ wordBalance.result }}
			</strong>
			<div class="words">
				<div
					v-for="(item, index) in wordBalance.words"
					:key="index"
				>
					<div class="words-title">
						{{ item.title }}
						<core-tooltip
							v-if="item.help"
						>
							<svg-circle-question-mark />

							<template #tooltip>
								<div v-html="item.help" />
							</template>
						</core-tooltip>
					</div>
					<div
						class="words-percent"
						:class="item.class"
						>
						{{ item.percent }} %
					</div>
					<div class="words-goal">{{ strings.goal }} {{ item.goal }}</div>
					<div class="bar">
						<div
							class="bar-progress"
							:class="item.class"
							:style="{width: item.bar + '%'}"
						/>
					</div>
					<div class="keywords">
						<div
							v-for="(word, index) in item.words"
							:key="index"
							class="keywords-item"
						>
							{{ word }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="box">
			<div class="box-icon">
				<div class="score">
					<svg-seo-site-score
						:score="characterCount.percent"
						:scoreColor="characterCount.class"
						:strokeWidth="3"
					/>
					<span class="number">{{ result.length }}</span>
				</div>
			</div>
			<div>
				<div class="box-title">{{ strings.characterCount }}</div>
				<strong
					class="box-result has-icon"
					:class="characterCount.class"
				>
					<component
						:is="characterCount.icon"
						:class="characterCount.class"
					/>
					{{ characterCount.result }}
				</strong>
				<p class="box-guideline">
					{{ characterCount.guideline }}
				</p>
			</div>
		</div>

		<div class="box">
			<div class="box-icon">
				<div class="score">
					<svg-seo-site-score
						:score="wordCount.percent"
						:scoreColor="wordCount.class"
						:strokeWidth="3"
					/>
					<span class="number">{{ result.wordCount }}</span>
				</div>
			</div>
			<div>
				<div class="box-title">{{ strings.wordCount }}</div>
				<strong
					class="box-result has-icon"
					:class="wordCount.class"
				>
					<component
						:is="wordCount.icon"
						:class="wordCount.class"
					/>
					{{ wordCount.result }}
				</strong>
				<p class="box-guideline">
					{{ wordCount.guideline }}
				</p>
			</div>
		</div>

		<div class="box">
			<div class="box-icon">
				<component
					:is="sentiment.icon"
					:class="sentiment.class"
				/>
			</div>
			<div>
				<div class="box-title">{{ strings.sentiment }}</div>
				<strong
					class="box-result"
					:class="sentiment.class"
				>
					{{ sentiment.result }}
				</strong>
				<p class="box-guideline">
					<strong>{{ sentiment.headline }}</strong> {{ sentiment.guideline }}
				</p>
			</div>
		</div>

		<div class="box">
			<div class="box-icon">
				<component
					:is="headlineTypes.icon"
					:class="headlineTypes.class"
				/>
			</div>
			<div>
				<div class="box-title">{{ strings.headlineType }}</div>
				<strong
					class="box-result"
					:class="headlineTypes.class"
				>
					{{ headlineTypes.result }}
				</strong>
				<p
					v-html="headlineTypes.guideline"
					class="box-guideline"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { HeadlineResult } from '@/vue/mixins'
export default {
	mixins : [ HeadlineResult ],
	props  : {
		result : {
			type     : Object,
			required : true
		}
	}
}
</script>

<style lang="scss">
.aioseo-headline-result {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 10px;

	@media (max-width: 782px) {
		grid-template-columns: repeat(1, 1fr);
	}

	.box {
		padding: 32px 30px;
		border: 1px solid #E8E8EB;
		display: flex;
		color: $black2;

		@media (max-width: 1200px) {
			padding: 20px;
		}

		&-icon {
			margin-right: 32px;
			flex: 0 0 60px;
			padding-top: 5px;
			line-height: 0;
			text-align: center;

			@media (max-width: 1200px) {
				flex: 0 0 40px;
				margin-right: 12px;
			}

			> svg {
				width: 32px;
			}

			.score {
				position: relative;

				.number {
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					color: $black;
					font-weight: bold;
					font-size: 26px;
					line-height: 100%;

					@media (max-width: 1200px) {
						font-size: 16px;
					}
				}
			}
		}

		&-title {
			color: #000000;
			font-weight: 600;
			font-size: 16px;
			line-height: 150%;
			margin-bottom: 6px;
		}

		&-result {
			margin-bottom: 12px;
			display: inline-block;
			font-weight: 600;
			font-size: 16px;
			line-height: 150%;

			&.has-icon {
				display: flex;
				align-items: center;
				font-size: 14px;
				line-height: 1;

				svg {
					width: 20px;
					margin-right: 5px;
				}
			}
		}

		&-guideline {
			margin: 0;
			font-size: 14px;
			line-height: 150%;

			strong {
				display: inline;
			}
		}

		&--large {
			grid-column: 1 / -1;
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			.box-title {
				margin-bottom: 0;
				margin-right: 25px;
			}

			.box-icon {
				margin-right: 6px;
				flex: 0 0 auto;
				padding-top: 0;

				svg {
					width: 20px;
				}
			}

			.box-result {
				font-size: 14px;
				line-height: 150%;
				margin-bottom: 0;
			}
		}
	}

	.words {
		flex: 1 0 100%;
		margin-top: 38px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 50px;

		@media (max-width: 1280px) {
			gap: 20px;
			grid-template-columns: repeat(2, 1fr);
		}

		@media (max-width: 480px) {
			grid-template-columns: repeat(1, 1fr);
		}

		&-title {
			font-weight: 400;
			font-size: 14px;
			line-height: 120%;
			color: $black2;
			margin-bottom: 12px;
		}

		&-percent {
			font-weight: bold;
			font-size: 28px;
			line-height: 100%;
			margin-bottom: 7px;
		}

		&-goal {
			color: $placeholder-color;
			font-size: 13px;
			line-height: 130%;
			margin-bottom: 8px;
		}

		.bar {
			width: 50%;

			@media (max-width: 782px) {
				width: 100%;
			}
		}
	}

	.bar {
		position: relative;
		height: 4px;
		width: 100%;
		background: $gray;
		border-radius: 50px;
		overflow: hidden;
		margin-bottom: 15px;

		&-progress {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			min-width: 3px;

			&.green {
				background-color: $green;
			}
			&.blue {
				background-color: $blue;
			}
			&.orange {
				background-color: $orange2;
			}
			&.red {
				background-color: $red;
			}
		}
	}

	.keywords {
		margin: 5px -5px -5px;

		&-item {
			font-size: 14px;
			color: #434960;
			font-weight: 600;
			background: #F3F4F5;
			padding: 9px 10px;
			border-radius: 3px;
			margin: 5px;
			display: inline-block;
		}
	}

	.aioseo-tooltip {
		display: inline-block;
		margin: 0 0 0 5px;
		vertical-align: middle;
	}
	.green {
		color: $green;
		fill: $green;
	}
	.blue {
		color: $blue;
		fill: $blue;
	}
	.orange {
		color: $orange2;
		fill: $orange2;
	}
	.red {
		color: $red;
		fill: $red;
	}
}
</style>