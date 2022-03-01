<template>
	<div class="aioseo-tab-content aioseo-redirects">
		<Redirects
			v-if="!isUnlicensed && $addons.isActive('aioseo-redirects') && !$addons.requiresUpgrade('aioseo-redirects')"
			:parentComponentContext="parentComponentContext"
		/>

		<RedirectsActivate
			v-if="!isUnlicensed && !$addons.isActive('aioseo-redirects') && $addons.canActivate('aioseo-redirects') && !$addons.requiresUpgrade('aioseo-redirects')"
			:parentComponentContext="parentComponentContext"
		/>

		<RedirectsLite
			v-if="isUnlicensed || $addons.requiresUpgrade('aioseo-redirects')"
			:parentComponentContext="parentComponentContext"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import Redirects from './pro/Redirects'
import RedirectsActivate from './pro/RedirectsActivate'
import RedirectsLite from './lite/Redirects'

export default {
	props : {
		parentComponentContext : String
	},
	components : {
		Redirects,
		RedirectsActivate,
		RedirectsLite
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>

<style lang="scss">
.redirects-options-table {
	margin: 0;
	border: 1px solid $input-border;
	border-radius: 3px;
	width: 100%;
	border-spacing: 0;
	border-collapse: separate;
	font-family: Helvetica;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 21px;
	letter-spacing: 0px;
	text-align: left;

	tr {
		td {
			padding: 16px 8px !important;
			background: $white;
			vertical-align: middle !important;

			&:first-child {
				padding-left: 16px !important;
			}

			&:last-child {
				padding-right: 16px !important;
			}

			&.arrow-col,
			&.actions {
				text-align: center;
			}

			&.arrow-col {
				div {
					display: flex;
					height: 100%;
					justify-content: center;
					align-items: center;
				}
			}

			&.actions {
				width: 20px;
			}

			&.aliased-domain {
				width: 100%;
			}
		}

		&.even {
			td {
				background-color: $box-background;
			}
		}
	}

	thead {
		td {
			height: 50px;
			padding: 0 8px !important;
			border-bottom: 1px solid $input-border;
			color: $black2 !important;

			&:first-child {
				border-radius: 3px 0 0 0;
			}

			&:last-child {
				border-radius: 0 3px 0 0;
			}

			&:first-child {
				&:last-child {
					border-radius: 3px 3px 0 0;
				}
			}
		}
	}

	tbody {
		tr:last-child {
			td:first-child {
				border-radius: 0 0 0 3px;
			}

			td:last-child {
				border-radius: 0 0 3px 0;
			}
		}
	}

	tfoot {
		td {
			height: 50px;
			padding: 0 8px !important;
			border-top: 1px solid $input-border;

			&:first-child {
				border-radius: 0 0 0 3px;
			}

			&:last-child {
				border-radius: 0 0 3px 0;
			}

			&:first-child {
				&:last-child {
					border-radius: 0 0 3px 3px;
				}
			}

			.aioseo-button + .aioseo-button {
				margin: 0 0 0 16px;
			}
		}
	}

	&.small{
		tr {
			td {
				padding: 8px !important;
			}
		}
		thead {
			td {
				height: 30px;
				padding: 0 8px !important;
			}
		}
	}

	svg {
		color: $gray2;
		&.aioseo-trash {
			width: 20px;
			height: 20px;
			cursor: pointer;
			&:hover {
				color: $red;
			}
		}

		&.aioseo-right-arrow {
			width: 26px;
			color: $placeholder-color;
		}
	}

	.aioseo-tooltip {
		display: flex;
		margin-left: 0;
	}
}
</style>