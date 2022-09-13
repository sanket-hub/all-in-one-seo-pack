<template>
	<div class="aioseo-tab-content aioseo-link-assistant">
		<Links
			v-if="!isUnlicensed && $addons.isActive('aioseo-link-assistant') && !$addons.requiresUpgrade('aioseo-link-assistant')"
			:parentComponentContext="parentComponentContext"
		/>

		<LinksLite
			v-if="isUnlicensed || $addons.requiresUpgrade('aioseo-link-assistant')"
			:parentComponentContext="parentComponentContext"
		/>

		<LinksActivate
			v-if="!isUnlicensed && !$addons.isActive('aioseo-link-assistant') && $addons.canActivate('aioseo-link-assistant') && !$addons.requiresUpgrade('aioseo-link-assistant')"
			:parentComponentContext="parentComponentContext"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import Links from './AIOSEO_VERSION/Links'
import LinksActivate from './AIOSEO_VERSION/LinksActivate'
import LinksLite from './lite/Links'

export default {
	components : {
		Links,
		LinksActivate,
		LinksLite
	},
	props : {
		parentComponentContext : String
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>

<style lang="scss">
.aioseo-link-assistant,
.aioseo-link-assistant-modal {
	padding: 0 !important;

	.aioseo-wp-table {
		tbody {
			th.check-column,
			td {
				font-size: 14px;
			}

			.date {
				font-size: 13px;
			}
		}

		tr.edit-row .edit-row-content {
			padding: 0;

			.wrapper .border {
				padding: 0;
			}

		}

		.tablenav {
			font-size: 13px !important;
		}

		button.toggle-row-button {
			display: flex;
			width: 30px;
			height: 26px;
			padding: 0;
			justify-content: center;
			align-items: center;
			background-color: white;
			border: 1px solid $gray;
			border-radius: 3px;

			&:hover {
				cursor: pointer;
				background-color: #F9F9FA;
			}

			&.active {
				background-color: $blue;
				border: 1px solid $blue;

				&:hover {
					background-color: $blue2;
				}

				svg {
					&.aioseo-caret {
						color: white;
						transform: rotate(-180deg);
					}
				}
			}

			svg {
				&.aioseo-caret {
					margin: 0;
					height: 20px;
					width: 20px;
					transform: rotate(-90deg);
					color: $placeholder-color;
					transition: transform 0.3s;
				}
			}
		}

		.row-actions {
			a {
				font-size: 13px;
				line-height: 150%;

				&.delete-all-links {
					color: $red;
				}
			}
		}

		svg {
			margin-right: 11.22px;

			&.aioseo-link-external {
				color: $blue;
				width: 10.5px;
				height: 10.5px;
			}
			&.aioseo-new-page {
				color: $black2;
				width: 9.33px;
				height: 11.67px;
			}
		}
	}

	.aioseo-tooltip .popper.action {
		a.tooltip-url {
			white-space: normal !important;
		}
	}

	.aioseo-wp-table.link-assistant-inner-table {
		.tablenav {
			height: auto;

			.aioseo-wp-bulk-actions {
				margin: 10px 0 16px 16px;
			}

			.pagination {
				margin: 10px 16px 16px 0;
			}
		}

		.wp-table table {
			border: 0;
			padding: 0;

			thead {
				tr:last-child {
					th.manage-column,
					td.manage-column {
						border-bottom: 1px solid #c3c4c7 !important;
					}

					th {
						padding: 8px 10px !important;

						&:first-of-type {
							padding-left: 15px !important;
						}
					}

					td {
						padding: 4px 0 0 8px !important;
					}
				}
			}

			tbody {
				tr {
					// These are set in WordPress Core but we need to reset them for the inner table; otherwise the row actions for all rows show on hover.
					.row-actions {
						position: relative;
					}

					&:hover {
						.row-actions {
							position : static;
						}
					}

					th {
						padding: 11px 0 0 8px;
					}

					td:first-of-type {
						padding-left: 15px;
					}
				}
			}

			tbody {
				.aioseo-tooltip {
					display: inline-block;
					margin-left: 0;
				}

				svg {
					&.aioseo-trash {
						width: 18px;
						height: 22px;
						color: $placeholder-color;
						cursor: pointer;
						transition: color 0.1s ease;
						margin-top: 2px;

						&:hover {
							color: $red;
						}
					}
				}
			}
		}
	}

	.aioseo-tabs {
		&.link-tabs {
			border-bottom: 1px solid $border;
			background-color: white;

			.aioseo-mobile-tabs {
				margin-left: 10px;
			}

			.md-tabs-navigation {
				margin-top: 0;
			}

			.md-button-content {
				display: flex;
				align-items: center;
				column-gap: 11.75px;
			}

			svg {
				width: 11px;
				height: 11px;
				margin-top: 3px;
				margin-right: 0;

				&.aioseo-link-internal-inbound,
				&.aioseo-link-internal-outbound {
					color: $green;
				}
				&.aioseo-link-external {
					color: $blue;
				}
				&.aioseo-link-affiliate {
					color: $orange;
					width: 12px;
					height: 12px;
					margin-top: 2px;
				}
				&.aioseo-link-suggestion {
					color: $black2-hover;
					width: 16.67px;
					height: 8.33px;
				}
			}
		}

		svg {
			display: inline-block !important;
		}
	}

	div.links-bottom {
		display: flex;
		flex-direction: row;
		padding: 17px 17px 24px 17px;
		a {
			text-decoration: underline;
			&.link-delete {
				color: $red !important;
			}
			&:hover{
				text-decoration: none;
				cursor: pointer;
			}
		}

		.links-bottom-left {
			display: flex;
			flex: 1 1 auto;
			column-gap: 28px;
			align-items: center;
			div {
				display:flex;
				align-items: center;
				svg {
					margin-right: 10px;
				}
			}

			button {
				svg {
					margin-top: 2.5px;
					margin-right: 10px;
					width: 14px;
					height: 14px;
					color: white;
				}
			}

			svg.aioseo-link-external {
				margin-top: 3.5px;
				width: 11px;
				height: 11px;
				color: $blue;
			}
		}

		.links-bottom-right {
			display: flex;
			align-items: center;
		}
	}
}

.aioseo-link-assistant-modal {
	.modal-mask .modal-wrapper .modal-container {
		max-width: 1300px;
	}

	.modal-body {
		align-items: start;

		.title-header {
			margin: 45px 0 0 0;
			align-self: start;
			span {
			font-weight: bold;
			font-size: 20px;
			line-height: 140%;
			color: $black;
			}
		}
	}
}

@media (max-width: 1500px) {
	.aioseo-link-assistant-modal {
		.modal-mask .modal-wrapper .modal-container {
			max-width: 1000px;
		}
	}
}

@media (max-width: 1150px) {
	.aioseo-link-assistant-modal {
		.modal-mask .modal-wrapper .modal-container {
			max-width: 750px;

			.modal-body {
				padding: 0 50px 50px;
			}
		}
	}
}
</style>