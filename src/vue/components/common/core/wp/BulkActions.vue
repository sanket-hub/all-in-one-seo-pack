<template>
	<div class="aioseo-wp-bulk-actions alignleft actions bulkactions">
		<select v-model="bulkAction">
			<option value="-1">{{ strings.bulkActions }}</option>

			<option
				v-for="(option, index) in bulkOptions"
				:key="index"
				:value="option.value"
			>{{ option.label }}</option>
		</select>

		<button
			class="button action"
			@click="'-1' !== bulkAction ? $emit('process-bulk-action', bulkAction) : null"
		>
			{{strings.apply}}
		</button>
	</div>
</template>

<script>
export default {
	props : {
		bulkOptions : {
			type     : Array,
			required : true
		}
	},
	data () {
		return {
			bulkAction : '-1',
			strings    : {
				bulkActions : this.$t.__('Bulk Actions', this.$td),
				apply       : this.$t.__('Apply', this.$td)
			}
		}
	}
}
</script>