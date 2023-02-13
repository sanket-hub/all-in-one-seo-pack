<template>
	<div class="aioseo-datepicker">
		<date-picker
			v-model="value"
			ref="picker"
			type="daterange"
			align="right"
			size="mini"
			unlink-panels
			:range-separator="separator"
			@change="value => $emit('change', value, rolling)"
			:clearable="false"
			:start-placeholder="strings.startDate"
			:end-placeholder="strings.endDate"
			:picker-options="pickerOptions"
		/>

		<div class="aioseo-datepicker-picker" @click="openPicker">
			<svg-calendar />

			<div class="range" v-html="range" />
		</div>
	</div>
</template>

<script>
import dateFormat from '@/vue/utils/dateFormat'
import SvgCalendar from '@/vue/components/common/svg/Calendar'
import { DatePicker } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/date-picker.css'

locale.use(lang)

export default {
	components : {
		DatePicker,
		SvgCalendar
	},
	data () {
		return {
			rolling       : null,
			pickerOptions : {
				disabledDate : this.isDisabledDate,
				shortcuts    : this.shortcuts,
				onPick       : value => this.$emit('on-pick', value)
			},
			strings : {
				startDate : this.$t.__('Start date', this.$td),
				endDate   : this.$t.__('End date', this.$td)
			},
			value : []
		}
	},
	props : {
		defaultValue : {
			type : Array,
			default () {
				const start = new Date()
				const end   = new Date()
				start.setDate(start.getDate() - 30)

				return [ start, end ]
			}
		},
		separator : {
			type : String,
			default () {
				return '-'
			}
		},
		isDisabledDate : {
			type : Function,
			default () {
				return false
			}
		},
		shortcuts : {
			type : Array,
			default () {
				return []
			}
		}
	},
	computed : {
		range () {
			if (!this.value[0] || !this.value[1]) {
				return ''
			}

			const format = this.$aioseo.data.dateFormat
			const start = dateFormat(this.value[0], format)
			const end   = dateFormat(this.value[1], format)

			return `${start} <span>${this.separator}</span> ${end}`
		}
	},
	methods : {
		openPicker () {
			this.$refs.picker.focus()
		}
	},
	mounted () {
		this.$nextTick(() => {
			if (!this.value[0] && !this.value[1]) {
				this.$refs.picker.mountPicker()
				this.$refs.picker.picker.$emit('pick', [ this.defaultValue[0], this.defaultValue[1] ])
			}
		})

		this.rolling = this.$aioseo.searchStatistics.rolling
		this.$bus.$on('rolling', (rolling) => {
			this.rolling = rolling
		})

		this.$emit('updated', this.rolling)
	},
	updated () {
		this.$emit('updated', this.rolling)

		// Eeach time the date range is updated, the local rolling value needs to be reset.
		// Otherwise the rolling value will persist even when the user selects a custom date range.
		this.rolling = ''
	}
}
</script>

<style lang="scss">
.aioseo-datepicker {
	&-picker {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 4px 10px;
		background: $white;
		border: 1px solid $input-border;
		border-radius: 4px;
		color: $black;
		font-weight: 700;
		font-size: 13px;
		cursor: pointer;

		.aioseo-calendar {
			width: 12px;
			height: 13px;
			color: $placeholder-color;
			margin-right: 6px;
		}

		.range {
			span {
				font-weight: 300;
			}
		}
	}

	// Hide El input and build ours instead.
	.el-input__inner {
		position: absolute;
		bottom: 5px;
		right: 0;
		width: 0;
		height: 0;
		opacity: 0;
		visibility: hidden;
	}

	@at-root {
		.el-picker-panel {
			border: 1px solid $input-border;
			box-shadow: 0 4px 26px rgba(44, 50, 76, 0.12);
			overflow: hidden;
			color: $black2-hover;

			&__shortcut {
				color: $black2;
				font-weight: 400;
				font-size: 14px;
				padding-left: 16px;

				&:hover {
					color: $blue;
				}

				&.active {
					color: $blue;
				}
			}

			&__sidebar,
			[slot=sidebar] {
				border-right: 0;
				padding-top: 16px;
				width: 130px;
			}

			[slot=sidebar] + &__body,
			&__sidebar + &__body {
				margin-left: 130px;
			}

			&__content {
				border-left: 0 !important;
				border-right: 0 !important;

				&::after {
					content: '';
					position: absolute;
					top: 16px;
					left: 0;
					width: 1px;
					height: 90%;
					background: $border;
				}
			}
		}

		.el-date-range-picker__header {
			padding: 0 10px;

			.el-picker-panel__icon-btn {
				width: 6px;
				height: 9px;
				padding: 0;

				&[class*=arrow-left] {
					background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgNiA5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNC41ODM5OCA4LjUwNzgxTDUuNTIzOTggNy41Njc4MUwyLjQ3MDY1IDQuNTA3ODFMNS41MjM5OCAxLjQ0NzgxTDQuNTgzOTggMC41MDc4MTJMMC41ODM5ODQgNC41MDc4MUw0LjU4Mzk4IDguNTA3ODFaIiBmaWxsPSIjMTQxQjM4Ii8+Cjwvc3ZnPgo=");
					margin-right: 9px;
				}

				&[class*=arrow-right] {
					background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgNiA5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMS43MTkzIDAuNTA3ODEyTDAuNzc5Mjk3IDEuNDQ3ODFMMy44MzI2MyA0LjUwNzgxTDAuNzc5Mjk3IDcuNTY3ODFMMS43MTkzIDguNTA3ODFMNS43MTkzIDQuNTA3ODFMMS43MTkzIDAuNTA3ODEyWiIgZmlsbD0iIzJDMzI0QyIvPgo8L3N2Zz4K");
					margin-left: 9px;
				}

				&.el-icon-d-arrow-left,
				&.el-icon-d-arrow-right {
					width: 12px;
				}

				&[disabled] {
					opacity: 0.2;
				}
			}
		}

		.el-date-range-picker__content .el-date-range-picker__header div {
			color: $black2-hover;
		}

		.el-date-table td.end-date span,
		.el-date-table td.start-date span {
			background-color: $blue;
		}

		.el-date-table td.in-range div,
		.el-date-table td.in-range div:hover,
		.el-date-table.is-week-mode .el-date-table__row.current div,
		.el-date-table.is-week-mode .el-date-table__row:hover div {
			background-color: rgba($blue, 0.1);
		}

		.el-date-table td.next-month,
		.el-date-table td.prev-month {
			color: $placeholder-color;
		}

		.el-date-table td.available:hover {
			color: $blue;
		}

		.el-date-table th {
			font-weight: 700;
			color: $black2;
			border-bottom: 0;
		}
	}
}
</style>