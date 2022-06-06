<template>
	<div
		class="aioseo-donut-chart"
	>
		<svg
			viewBox="0 0 33.83098862 33.83098862"
			xmlns="http://www.w3.org/2000/svg"
			v-if="0 === total"
		>
			<circle
				class="aioseo-donut-chart-score__circle"
				stroke="#e8e8eb"
				stroke-dasharray="100"
				stroke-linecap="round"
				:stroke-width="2"
				fill="none"
				cx="16.91549431"
				cy="16.91549431"
				r="15.91549431"
			/>
		</svg>

		<svg
			viewBox="0 0 33.83098862 33.83098862"
			xmlns="http://www.w3.org/2000/svg"
			v-if="0 < total"
		>
			<template
				v-for="(part, index) in parts"
			>
				<circle
					v-if="Math.round(part.ratio) && 0 !== index"
					:key="index + '_border'"
					class="aioseo-donut-chart-score__circle"
					stroke="#FFFFFF"
					:stroke-dasharray="`${Math.round(part.ratio)} ${parseFloat(99 - Math.round(part.ratio))}`"
					stroke-linecap="round"
					:stroke-width="2.5"
					fill="none"
					cx="16.91549431"
					cy="16.91549431"
					r="15.91549431"
				/>
				<circle
					v-if="Math.round(part.ratio)"
					:key="index + '_stroke'"
					class="aioseo-donut-chart-score__circle"
					:stroke="part.color"
					:stroke-dasharray="`${100 === Math.round(part.ratio) ? 100 : Math.round(part.ratio) - 1} 100`"
					stroke-linecap="round"
					:stroke-width="2"
					fill="none"
					cx="16.91549431"
					cy="16.91549431"
					r="15.91549431"
				/>
			</template>
		</svg>

		<div class="total-amount-wrapper">
			<div
				class="total-amount"
			>
				<div class="total">
					<util-fit-text
						:max="40"
						:constrain-to-element="$el"
						:element-padding="30"
					>
						<util-animated-number v-if="animatedNumber" :number="parseInt(total)" />
						<div v-else v-html="parseInt(total)" />
					</util-fit-text>
				</div>
				<div class="label">{{ label }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import UtilAnimatedNumber from '@/vue/components/common/util/AnimatedNumber'
import UtilFitText from '@/vue/components/common/util/FitText'
export default {
	components : {
		UtilAnimatedNumber,
		UtilFitText
	},
	props : {
		parts : {
			type     : Array,
			required : true
		},
		label : {
			type     : String,
			required : true
		},
		total : {
			type     : Number,
			required : true
		},
		animatedNumber : {
			type : Boolean,
			default () {
				return true
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-app .aioseo-donut-chart {
	position: relative;

	svg {
		width: 100%;
		circle {
			transform: rotate(270deg);
			transform-origin: center;
		}
	}

	.total-amount-wrapper {
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
		margin: 20px;

		.total-amount {
			text-align: center;

			.total {
				font-size: 40px;
				font-weight: bold;
				line-height: 1;
			}

			.label {
				margin-top: 5px;
				line-height: 150%;
			}
		}
	}
}
</style>