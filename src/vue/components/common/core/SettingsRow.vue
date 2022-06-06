<template>
	<grid-row
		class="aioseo-settings-row"
		:class="{
			'no-horizontal-margin': noHorizontalMargin,
			'no-vertical-margin': noVerticalMargin,
			'no-border': noBorder
		}"
	>
		<slot name="header" />

		<grid-column
			:md="leftSize"
		>
			<div class="settings-name">
				<div
					class="name"
					:class="[
						{ align: align },
						{ 'align-small': alignSmall }
					]"
				>
					<slot name="name">
						{{ name }}
					</slot>
				</div>
				<div
					v-if="$slots.description"
					class="aioseo-description"
				>
					<slot name="description" />
				</div>
			</div>
		</grid-column>

		<grid-column
			:md="rightSize"
		>
			<div class="settings-content">
				<slot name="content" />
			</div>
		</grid-column>
	</grid-row>
</template>

<script>
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'
export default {
	components : {
		GridColumn,
		GridRow
	},
	props : {
		align              : Boolean,
		alignSmall         : Boolean,
		name               : String,
		noHorizontalMargin : {
			type    : Boolean,
			default : false
		},
		noVerticalMargin : {
			type    : Boolean,
			default : false
		},
		noBorder : {
			type    : Boolean,
			default : false
		},
		leftSize : {
			type : String,
			default () {
				return '3'
			}
		},
		rightSize : {
			type : String,
			default () {
				return '9'
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-settings-row {
	margin-bottom: 22px;
	padding-bottom: 16px;
	border-bottom: 1px solid $border;

	&.no-margin {
		margin-bottom: 0;
	}

	&.small-padding {
		padding-bottom: 5px;
	}

	&.medium-margin {
		margin-bottom: 15px;
	}

	&.no-border {
		border: none;
	}

	&.no-horizontal-margin {
		margin-left: 0 !important;
		margin-right: 0 !important;
	}

	&.no-vertical-margin {
		margin-top: 0 !important;
		margin-bottom: 0 !important;
	}

	.settings-name {
		color: $black;

		.name {
			font-weight: 600;
			font-size: 16px;
			display: flex;
			align-items: center;

			&.small-margin {
				margin-bottom: 5px;
			}

			&.align {
				line-height: 40px;
			}

			&.align-small {
				line-height: 30px;
			}

			.aioseo-pro-badge {
				margin-left: 10px;
			}
		}

		.aioseo-description {
			margin-top: 20px;
		}
	}

	.settings-content {
		font-size: 16px;
	}

	p.description {
		font-size: 14px;
	}
}
</style>