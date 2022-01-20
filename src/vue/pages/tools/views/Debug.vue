<template>
	<div class="aioseo-tools-debug">
		<Debug
			v-if="$isPro && $aioseo.data.isDev"
		/>
		<DebugLite
			v-if="!$isPro && $aioseo.data.isDev"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Debug from './pro/Debug'
import DebugLite from './lite/Debug'

export default {
	components : {
		Debug,
		DebugLite
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>

<style lang="scss">
	.aioseo-app .aioseo-tools-debug {
		.aioseo-alert.warning {
			margin-bottom: 30px;
		}
		div.first-row {
			border-top: 1px solid #E8E8EB;
			margin-top: 22px;
			padding-top: 16px;
		}
		div.action-row {
			margin: 20px 0 0 0;

			&:first-child {
				margin: 0;
			}
		}

		.aioseo-modal-body {
		padding: 20px 50px 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;

		h3 {
			font-size: 20px;
			margin-bottom: 16px;
		}

		.reset-description {
			font-size: 16px;
			color: $black;
			margin-bottom: 16px;
			text-align: center;
			max-width: 515px;
		}

		button.close {
			position: absolute;
			right: 11px;
			top: 11px;
			width: 24px;
			height: 24px;
			background-color: #fff;
			border: none;
			display: flex;
			align-items: center;

			svg.aioseo-close {
				cursor: pointer;
				width: 14px;
				height: 14px;
			}
		}

		.aioseo-description {
			max-width: 510px;
			text-align: center;
		}

		.aioseo-button:not(.close) {
			margin-top: 16px;
		}
	}
	}
</style>