<template>
	<div
		class="aioseo-score-button"
		:class="scoreClass"
		:id="getId"
	>
	{{ (this.score === 0) ? 'N/A' : `${this.score}/100` }}
	</div>
</template>

<script>
export default {
	props : {
		score : {
			type : Number,
			default () {
				return 0
			}
		},
		postId : {
			type : Number,
			default () {
				return 0
			}
		}
	},
	computed : {
		scoreClass : function () {
			return 80 < this.score ? 'score-green' : 50 < this.score ? 'score-orange' : 1 < this.score ? 'score-red' : 'score-disabled'
		},
		getId : function () {
			return `score-button-${this.postId}`
		}
	}
}
</script>

<style lang="scss">
.aioseo-score-settings {
	display: flex;
	align-items: center;
	padding-bottom: 14px;
	svg {
		margin-right: 7px;
	}
	span {
		margin-right: 12px;
	}
}
.aioseo-score-button {
	display: inline-block;
	padding: 5px 8px;
	font-size: 14px;
	font-weight: bold;
	color: #a1a1a1;
	border: 1px solid #a1a1a1;
	border-radius: 3px;

	&.score-red,
	&.score-none {
		border-color: $red;
		color: $red !important;
	}
	&.score-orange {
		border-color: $orange;
		color: $orange !important;
	}
	&.score-green {
		border-color: $green;
		color: $green !important;
	}
	&.classic-editor {
		background: #fff !important;
		display: inline-block !important;
		height: auto !important;
		span {
			margin-right: 0;
		}
	}
}
</style>