<template>
	<div class="aioseo-wp-additional-filters alignleft actions">
		<template
			v-for="(filter, index) in additionalFilters"
		>
			<label
				:key="index + '_label'"
				for="filter-by-date"
				class="screen-reader-text"
			>{{ filter.label }}</label>
			<select
				:key="index + '_select'"
				:name="filter.name"
				v-model="selectedFilters[filter.name]"
				@change="event => $emit('change', {name : filter.name, selectedValue : event.target.value})"
			>
				<option
					v-for="(option, index) in filter.options"
					:key="index"
					:value="option.value"
				>
					{{ option.label }}
				</option>
			</select>
		</template>
		<input
			type="submit"
			class="button action"
			@click="$emit('process-additional-filters', selectedFilters)"
			:value="strings.filter"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props : {
		additionalFilters : {
			type     : Array,
			required : true
		}
	},
	data () {
		return {
			strings : {
				filter : this.$t.__('Filter', this.$td)
			}
		}
	},
	computed : {
		...mapState('redirects', [ 'selectedFilters' ])
	},
	mounted () {
		this.setInitialOptions()
	},
	updated () {
		this.setInitialOptions()
	},
	methods : {
		setInitialOptions () {
			this.additionalFilters.forEach(filter => {
				if (!this.selectedFilters[filter.name]) {
					this.$set(this.selectedFilters, filter.name, filter.options[0].value)
				}
			})
		}
	}
}
</script>