<template>
	<date-range-picker
		class="aioseo-date-picker"
		:class="{ [size]: size }"
		ref="picker"
		opens="center"
		:locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
		singleDatePicker
		:timePicker="false"
		:timePicker24Hour="false"
		:showWeekNumbers="false"
		showDropdowns
		autoApply
		:ranges="false"
		v-model="dateRange"
		appendToBody
	>
		<template #input="picker">
			<span>{{ formatDate(picker.startDate) }}</span>
			<svg-circle-close
				v-if="picker.startDate || picker.endDate"
				@click.native="clearDates($event)"
			/>
		</template>
	</date-range-picker>
</template>

<script>
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import DateRangePicker from 'vue2-daterange-picker'
export default {
	components : { DateRangePicker },
	props      : {
		value : String,
		size  : {
			type        : String,
			default     : '',
			description : 'Button size (small|medium|large)'
		}
	},
	data () {
		return {
			dateRange : {
				startDate : null,
				endDate   : null,
				ranges    : false
			}
		}
	},
	watch : {
		dateRange : {
			deep : true,
			handler () {
				this.$emit('input', this.formatDate(this.dateRange.startDate))
			}
		},
		value () {
			this.dateRange.startDate = this.value ? new Date(this.value) : null
			this.dateRange.endDate   = this.value ? new Date(this.value) : null
		}
	},
	methods : {
		clearDates (event) {
			event.stopPropagation()
			this.dateRange.startDate = null
			this.dateRange.endDate   = null
		},
		formatDate (date) {
			if (!date) {
				return date
			}

			return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
		}
	},
	mounted () {
		if (this.value) {
			this.dateRange.startDate = new Date(this.value)
			this.dateRange.endDate   = new Date(this.value)
		}
	}
}
</script>

<style lang="scss">
.aioseo-date-picker.vue-daterange-picker {
	width: 100%;

	.form-control {
		display: flex;
		align-items: center;
		color: $black;
		font-size: 16px;
		height: 48px;
		border-radius: 3px;
		border: 1px solid $input-border;
		position: relative;

		svg.aioseo-circle-close {
			position: absolute;
			right: 10px;
			color: $black2;
			width: 15px;
			height: 15px;
		}
	}

	&.small {
		.form-control {
			height: 30px;
		}
	}

	&.medium {
		.form-control {
			height: 40px;
		}
	}
}
body[class*=all-in-one-seo_page] {
	.daterangepicker {
		.yearselect {
			width: 75px;
		}
	}
}
</style>