<template>
	<div class="aioseo-link-chart-with-legend">
		<div class="chart-left">
			<LinkChart
				:parts="parts"
				:total="total"
				:label="label"
			/>
		</div>

		<div class="chart-right">
			<div
				class="legend"
				v-for="(part, index) in sortedParts"
				:key="index"
			>
				<div class="legend-bullet"
					:style="`background-color: ${part.color}`"
				/>
				<span class="legend-amount">
					<util-animated-number
						:number="parseInt(part.count)"
					/>
				</span>
				<span class="legend-label">{{ part.name  }}</span>
			</div>

			<div class="chart-link"
				v-if="total > 0"
			>
				<span v-html="link" />
			</div>
		</div>
	</div>
</template>

<script>
import LinkChart from './LinkChart'
export default {
	components : {
		LinkChart
	},
	props : {
		parts : {
			type     : Array,
			required : true
		},
		total : {
			type     : Number,
			required : true
		},
		label : {
			type     : String,
			required : true
		},
		link : {
			type     : String,
			required : true
		}
	},
	computed : {
		sortedParts () {
			const clonedParts = this.parts.map(x => x)

			// Move "other domains" to last position regardless of its size/length.
			clonedParts.forEach(function (object, index) {
				if (object.last) {
					clonedParts.push(clonedParts[index])
					clonedParts.splice(index, 1)
				}
			})
			return clonedParts
		}
	}
}
</script>

<style lang="scss">
.aioseo-app .aioseo-link-chart-with-legend {
	display: flex;
	font-size: 14px;
	color: $black;

	.chart-left {
		max-width: 217px;
		position: relative;
	}

	.chart-right {
		flex: 1 1 80%;
		font-size: 14px;
		line-height: 130%;
		margin-left: 50px;
		margin-top: auto;
		margin-bottom: auto;

		.legend {
			display: flex;
			align-items: center;
			padding: 6px;
			span {
				display: inline-block;
			}
			.legend-bullet {
				width: 12px;
				height: 12px;
				min-width: 12px;
				border-radius: 50%;
				margin-right: 9px;
			}
			.legend-amount {
				font-weight: bold;
				margin-right: 12px;
				min-width: 30px;
				text-align: left;
			}
			.legend-label {
				line-height: 130%;
			}
		}

		.chart-link {
			margin-top: 21px;
			margin-left: 6px;
			color: $blue;
			cursor: pointer;
			font-weight: bold;
			a {
				text-decoration: underline;
				&:not(:first-of-type),
				&:hover {
					text-decoration: none;
				}
			}
		}
	}

	@media screen and (max-width: 1200px) {
		display: block !important;
		.chart-left {
			margin-left: auto;
			margin-right: auto;
		}
		.chart-right {
			margin-left: auto;
			margin-right: auto;
			margin-top: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
}
</style>