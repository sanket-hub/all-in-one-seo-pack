<template>
	<svg
		class="aioseo-seo-site-score-svg"
		viewBox="0 0 33.83098862 33.83098862"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			class="aioseo-seo-site-score__background"
			stroke-width="2"
			fill="none"
			cx="16.91549431"
			cy="16.91549431"
			r="15.91549431"
		/>
		<circle
			class="aioseo-seo-site-score__circle"
			:class="getSpeedClass"
			:stroke="scoreColor"
			stroke-width="2"
			:stroke-dasharray="`${score},100`"
			stroke-linecap="round"
			fill="none"
			cx="16.91549431"
			cy="16.91549431"
			r="15.91549431"
		/>
	</svg>
</template>

<script>
export default {
	props : {
		backgroundColor : {
			type : String,
			default () {
				return '#E8E8EB'
			}
		},
		scoreColor : {
			type : String,
			default () {
				return '#00AA63'
			}
		},
		score : {
			type     : Number,
			required : true
		}
	},
	computed : {
		getSpeedClass () {
			return 33 >= this.score
				? 'fast'
				: (
					66 >= this.score
						? 'medium'
						: 'slow'
				)
		}
	}
}
</script>

<style lang="scss">
.aioseo-seo-site-score__circle {
	animation: aioseo-seo-site-score-fill 1s reverse;
	transform: rotate(-180deg);
	transform-origin: center;
	stroke: $green;

	&.fast {
		animation-duration: 0.5s;
		stroke: $red;
	}

	&.medium {
		animation-duration: 0.75s;
		stroke: $orange;
	}
}

.aioseo-seo-site-score__background {
	stroke: $border;
}

@keyframes aioseo-seo-site-score-fill {
	to { stroke-dasharray: 0 100; }
}
</style>